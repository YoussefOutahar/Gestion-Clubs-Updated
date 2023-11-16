import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class Constants {
  // Info
  public static readonly APP_NAME: string = "Project Management";
  public static readonly APP_VERSION: string = "1.0.0";
  public static readonly APP_AUTHOR: string = "Youssef Outahar";

  // API
  public static readonly API_URL: string = "http://localhost:8082/api/v1/";
  public static readonly API_URL_AUTH: string = Constants.API_URL + "auth/";
}