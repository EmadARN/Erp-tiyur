import { z } from "zod";
import type { ConfigItem } from "../types";

export const generateSchema = (configs: ConfigItem[]) => {
    const shape: Record<string, any> = {};
    configs.forEach((cfg) => {
        switch (cfg.type) {
            case "string-input":
                shape[cfg.name] = z.string().min(1, `${cfg.label} is required`);
                break;
            case "select-box":
                shape[cfg.name] = z.string().min(1, `${cfg.label} is required`);
                break;
            default:
                shape[cfg.name] = z.any();
        }
    });
    return z.object(shape);
};


