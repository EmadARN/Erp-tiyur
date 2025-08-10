// import { Button } from "@/modules/shared/components/ui/Button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/modules/shared/components/ui/Dialog";
// import * as React from "react";
// import SelectBox from "@/modules/shared/components/ui/Selecbox.tsx";
// import Switch from "@/modules/shared/components/ui/Switch.tsx";
// import MotionMultiSelect from "@/modules/shared/components/ui/MotionMultiSelect.tsx";

// interface ConfigItem {
//   name: string;
//   label: string;
//   type: "string-input" | "select-box" | "switch" | "multi-select";
//   options?: any[];
// }

// interface UpdateDialogProps {
//   open: boolean;
//   onClose: () => void;
//   onConfirm: (data: any) => void;
//   configs: ConfigItem[];
//   data: Record<string, any>; // داده‌ای که از بیرون میاد برای پر کردن فرم
// }

// export function UpdateDialog({
//   open,
//   onClose,
//   onConfirm,
//   configs,
//   data,
// }: UpdateDialogProps) {
//   const [formState, setFormState] = React.useState<Record<string, any>>({});

//   React.useEffect(() => {
//     // پر کردن استیت اولیه بر اساس data و configs
//     const initialValues: Record<string, any> = {};
//     configs.forEach((cfg) => {
//       initialValues[cfg.name] = data[cfg.name] ?? "";
//     });
//     setFormState(initialValues);
//   }, [configs, data]);

//   const handleChange = (name: string, value: any) => {
//     setFormState((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = () => {
//     console.log("updated data:", formState);
//     onConfirm(formState);
//     onClose();
//   };

//   return (
//     <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
//       <DialogContent className="space-y-4">
//         <DialogHeader>
//           <DialogTitle>ویرایش اطلاعات</DialogTitle>
//         </DialogHeader>

//         {configs.map((cfg) => {
//           const value = formState[cfg.name] ?? "";

//           switch (cfg.type) {
//             case "string-input":
//               return (
//                 <div key={cfg.name} className="space-y-2">
//                   <label className="block text-sm font-medium">
//                     {cfg.label}
//                   </label>
//                   <input
//                     type="text"
//                     value={value}
//                     onChange={(e) => handleChange(cfg.name, e.target.value)}
//                     className="w-full px-3 py-2 border rounded"
//                   />
//                 </div>
//               );

//             case "select-box":
//               return (
//                 <div key={cfg.name}>
//                   <label className="block text-sm font-medium mb-2">
//                     {cfg.label}
//                   </label>
//                   <SelectBox
//                     options={(cfg.options ?? []).map((opt) =>
//                       typeof opt === "string" ? { value: opt, label: opt } : opt
//                     )}
//                     value={value}
//                     onChange={(val) => handleChange(cfg.name, val)}
//                   />
//                 </div>
//               );

//             case "switch":
//               return (
//                 <div
//                   key={cfg.name}
//                   className="flex items-center justify-between"
//                 >
//                   <span>{cfg.label}</span>
//                   <Switch
//                     checked={!!value}
//                     onChange={(val) => handleChange(cfg.name, val)}
//                   />
//                 </div>
//               );

//             case "multi-select":
//               return (
//                 <div key={cfg.name}>
//                   <label className="block text-sm font-medium mb-2">
//                     {cfg.label}
//                   </label>
//                   <MotionMultiSelect
//                     options={(cfg.options ?? []).map((opt) =>
//                       typeof opt === "string" ? { value: opt, label: opt } : opt
//                     )}
//                     value={value}
//                     onChange={(val) => handleChange(cfg.name, val)}
//                     placeholder=""
//                   />
//                 </div>
//               );

//             default:
//               return null;
//           }
//         })}

//         <div className="flex justify-end gap-2">
//           <Button variant="ghost" onClick={onClose}>
//             انصراف
//           </Button>
//           <Button onClick={handleSubmit}>ذخیره</Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }
import { Button } from "@/modules/shared/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/modules/shared/components/ui/Dialog";
import * as React from "react";
import SelectBox from "@/modules/shared/components/ui/Selecbox";
import Switch from "@/modules/shared/components/ui/Switch";
import MotionMultiSelect from "@/modules/shared/components/ui/MotionMultiSelect";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../ui/TextInput";
import type { ConfigItem, OptionType } from "../../types";
import { generateSchema } from "../../model/schemas";

interface UpdateDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: Record<string, any>) => void;
  configs: ConfigItem[];
  data: Record<string, any>;
}

// ------------------- Component -------------------
export function UpdateDialog({
  open,
  onClose,
  onConfirm,
  configs,
  data,
}: UpdateDialogProps) {
  const schema = React.useMemo(() => generateSchema(configs), [configs]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Record<string, any>>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: data,
  });

  React.useEffect(() => {
    reset(data);
  }, [data, reset]);

  const onSubmit = (formData: Record<string, any>) => {
    onConfirm(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="space-y-6 max-w-lg w-full px-4 sm:px-6">
        <DialogHeader>
          <DialogTitle>Edit Information</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {configs.map((cfg) => {
            const options: OptionType[] = (cfg.options ?? []).map((opt) =>
              typeof opt === "string" ? { value: opt, label: opt } : opt
            );

            switch (cfg.type) {
              case "string-input":
                return (
                  <div key={cfg.name} className="space-y-1">
                    <label
                      htmlFor={cfg.name}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {cfg.label}
                    </label>
                    <Controller
                      name={cfg.name}
                      control={control}
                      render={({ field }) => (
                        <TextInput
                          {...field}
                          id={cfg.name}
                          placeholder={cfg.label}
                          inputType="text"
                          className={`w-full ${
                            errors[cfg.name] ? "border-red-500" : ""
                          }`}
                          onChange={field.onChange}
                          value={field.value}
                        />
                      )}
                    />

                    {errors[cfg.name] && (
                      <p className="text-xs text-red-600 mt-1">
                        {errors[cfg.name]?.message?.toString()}
                      </p>
                    )}
                  </div>
                );

              case "select-box":
                return (
                  <div key={cfg.name} className="space-y-1">
                    <label
                      htmlFor={cfg.name}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {cfg.label}
                    </label>
                    <Controller
                      name={cfg.name}
                      control={control}
                      render={({ field }) => (
                        <SelectBox
                          id={cfg.name}
                          options={options}
                          value={field.value}
                          onChange={field.onChange}
                          className={errors[cfg.name] ? "border-red-500" : ""}
                        />
                      )}
                    />
                    {errors[cfg.name] && (
                      <p className="text-xs text-red-600 mt-1">
                        {errors[cfg.name]?.message?.toString()}
                      </p>
                    )}
                  </div>
                );

              case "switch":
                return (
                  <div
                    key={cfg.name}
                    className="flex items-center justify-between space-x-2"
                  >
                    <span className="text-sm font-medium text-gray-700">
                      {cfg.label}
                    </span>
                    <Controller
                      name={cfg.name}
                      control={control}
                      render={({ field }) => (
                        <Switch
                          checked={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                    {errors[cfg.name] && (
                      <p className="text-xs text-red-600 mt-1">
                        {errors[cfg.name]?.message?.toString()}
                      </p>
                    )}
                  </div>
                );

              case "multi-select":
                return (
                  <div key={cfg.name} className="space-y-1">
                    <label
                      htmlFor={cfg.name}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {cfg.label}
                    </label>
                    <Controller
                      name={cfg.name}
                      control={control}
                      render={({ field }) => (
                        <MotionMultiSelect
                          id={cfg.name}
                          options={options}
                          value={field.value}
                          onChange={field.onChange}
                          placeholder=""
                          className={errors[cfg.name] ? "border-red-500" : ""}
                        />
                      )}
                    />
                    {errors[cfg.name] && (
                      <p className="text-xs text-red-600 mt-1">
                        {errors[cfg.name]?.message?.toString()}
                      </p>
                    )}
                  </div>
                );

              default:
                return null;
            }
          })}

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
