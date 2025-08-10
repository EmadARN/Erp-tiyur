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
//
//
//
//
//
//
//
//
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
//
//
//
//
//
//
//
//
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
import SelectBox from "@/modules/shared/components/ui/Selecbox.tsx";
import Switch from "@/modules/shared/components/ui/Switch.tsx";
import MotionMultiSelect from "@/modules/shared/components/ui/MotionMultiSelect.tsx";

interface ConfigItem {
  name: string;
  label: string;
  type: "string-input" | "select-box" | "switch" | "multi-select";
  options?: any[];
  defaultValue?: any;
}

interface CreateDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
  configs: ConfigItem[];
}

export function CreateDialog({
                               open,
                               onClose,
                               onConfirm,
                               configs,
                             }: CreateDialogProps) {
  // مقدار پیش‌فرض استیت بر اساس configs
  const [formState, setFormState] = React.useState<Record<string, any>>({});

  React.useEffect(() => {
    const defaults: Record<string, any> = {};
    configs.forEach((cfg) => {
      defaults[cfg.name] =
          cfg.defaultValue ??
          (cfg.type === "multi-select"
              ? []
              : cfg.type === "switch"
                  ? false
                  : "");
    });
    setFormState(defaults);
  }, [configs]);

  // هندل تغییر مقدار هر فیلد
  const handleChange = (name: string, value: any) => {
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // دکمه ذخیره
  const handleSubmit = () => {
    console.log("final data: ", formState);
    onConfirm(formState);
    onClose();
  };

  return (
      <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
        <DialogContent className="space-y-4">
          <DialogHeader>
            <DialogTitle>ساخت اطلاعات</DialogTitle>
          </DialogHeader>

          {configs.map((cfg) => {
            const value = formState[cfg.name] ?? "";

            switch (cfg.type) {
              case "string-input":
                return (
                    <div key={cfg.name} className="space-y-2">
                      <label className="block text-sm font-medium">
                        {cfg.label}
                      </label>
                      <input
                          type="text"
                          value={value}
                          onChange={(e) => handleChange(cfg.name, e.target.value)}
                          className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                );

              case "select-box":
                return (
                    <div key={cfg.name}>
                      <label className="block text-sm font-medium mb-2">
                        {cfg.label}
                      </label>
                      <SelectBox
                          options={(cfg.options ?? []).map((opt) =>
                              typeof opt === "string"
                                  ? { value: opt, label: opt }
                                  : opt
                          )}
                          value={value}
                          onChange={(val) => handleChange(cfg.name, val)}
                      />
                    </div>
                );

              case "switch":
                return (
                    <div
                        key={cfg.name}
                        className="flex items-center justify-between"
                    >
                      <span>{cfg.label}</span>
                      <Switch
                          checked={!!value}
                          onChange={(val) => handleChange(cfg.name, val)}
                      />
                    </div>
                );

              case "multi-select":
                return (
                    <div key={cfg.name}>
                      <label className="block text-sm font-medium mb-2">
                        {cfg.label}
                      </label>
                      <MotionMultiSelect
                          options={(cfg.options ?? []).map((opt) =>
                              typeof opt === "string"
                                  ? { value: opt, label: opt }
                                  : opt
                          )}
                          value={value}
                          onChange={(val) => handleChange(cfg.name, val)}
                          placeholder=""
                      />
                    </div>
                );

              default:
                return null;
            }
          })}

          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose}>
              انصراف
            </Button>
            <Button onClick={handleSubmit}>ذخیره</Button>
          </div>
        </DialogContent>
      </Dialog>
  );
}
