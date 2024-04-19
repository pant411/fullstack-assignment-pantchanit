import { CONFIG } from "@/configs/config";
import AxiosBase from "@/libs/axios/base";

class BackendAPIService extends AxiosBase {
  constructor(url: string) {
    super(url);
  }

}

export const backendAPIService = new BackendAPIService(CONFIG.backendUrl);
