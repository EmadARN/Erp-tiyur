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
// const create_dialog_configs = [
//
//   {
//     name:'title',
//     label:'ttile product',
//     type:'string-input',
//     defaultValue: 'product-1'
//   },
//   {
//     name: 'sort-by',
//     label: 'sort by',
//     type: 'select-box',
//     options: ['max-price', 'low-price'],
//     defaultValue: 'max-price'
//   },
//   {
//     name: 'price-based',
//     label: 'price-based',
//     type: 'switch',
//     defaultValue: true
//   },
//   {
//     name: 'construction-based',
//     label: 'costruction select',
//     type: 'multi-select',
//     options: ['iran', 'dubai'],
//     defaultValue: ['iran']
//   },
//
// ];
// interface CreateDialogProps {
//   open: boolean;
//   onClose: () => void;
//   onConfirm: (data: any) => void;
//   defaultValues?: any;
// }
//
// export function CreateDialog({
//   open,
//   onClose,
//   onConfirm,
//   defaultValues = {},
// }: CreateDialogProps) {
//   const [formState, setFormState] = React.useState(defaultValues);
//
//   React.useEffect(() => {
//     setFormState(defaultValues);
//   }, []);
//
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormState((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };
//
//   const handleSubmit = () => {
//     onConfirm(formState);
//     onClose();
//   };
//
//   const option_select =['ali', 'mack']
//   return (
//     <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
//       <DialogContent className="space-y-4">
//         <DialogHeader>
//           <DialogTitle>ساخت اطلاعات</DialogTitle>
//         </DialogHeader>
//
//         <div className="space-y-2">
//           <label className="block text-sm font-medium">عنوان</label>
//           <input
//             type="text"
//             name="title"
//             value={formState.title || ""}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded"
//           />
//         </div>
//
//         <div key={'sdfasd'}>
//           <label className="block text-sm font-medium mb-2">select ela</label>
//           <SelectBox
//               options={(option_select ?? []).map((opt) =>
//                   typeof opt === "string" ? { value: opt, label: opt } : opt
//               )}
//               value={'ali'}
//               onChange={(val) => console.log('select',val)}
//           />
//         </div>
//
//
//         <div key={'filter.name'} className="flex items-center justify-between">
//           <span>filter.label</span>
//           <Switch
//               checked={true}
//               onChange={(val) => console.log(val)}
//           />
//         </div>
//
//         <div key={'filter.name'}>
//           <label className="block text-sm font-medium mb-2">filter.label</label>
//           <MotionMultiSelect
//               options={(option_select ?? []).map((opt) =>
//                   typeof opt === "string" ? { value: opt, label: opt } : opt
//               )}
//               value={'ali'}
//               onChange={(val) => console.log('slksdlfd : ', val)}
//               placeholder={""}
//           />
//         </div>
//
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
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../ui/TextInput";
import { generateSchema } from "../../model/schemas";
import type { ConfigItem, OptionType } from "../../types";

interface CreateDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: Record<string, any>) => void;
  configs: ConfigItem[];
}

// دینامیک ساختن schema بر اساس configs

export function CreateDialog({
  open,
  onClose,
  onConfirm,
  configs,
}: CreateDialogProps) {
  // مقدار پیش فرض بر اساس configs و defaultValue
  const defaultValues = React.useMemo(() => {
    const defaults: Record<string, any> = {};
    configs.forEach((cfg) => {
      if (cfg.defaultValue !== undefined) defaults[cfg.name] = cfg.defaultValue;
      else
        defaults[cfg.name] =
          cfg.type === "multi-select" ? [] : cfg.type === "switch" ? false : "";
    });
    return defaults;
  }, [configs]);

  const schema = React.useMemo(() => generateSchema(configs), [configs]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Record<string, any>>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues,
  });

  React.useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit: SubmitHandler<Record<string, any>> = (data) => {
    onConfirm(data);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="space-y-6 max-w-lg w-full px-4 sm:px-6">
        <DialogHeader>
          <DialogTitle>Create Information</DialogTitle>
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
                      {cfg.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
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
                      {cfg.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
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
                      {cfg.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
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
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
