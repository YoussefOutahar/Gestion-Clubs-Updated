import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class Constants {
  // Info
  public static readonly APP_NAME: string = "Gestion Des Clubs";
  public static readonly APP_VERSION: string = "1.0.0";

  // API
  public static readonly API_URL: string = "http://localhost:8082/api/v1/";
  public static readonly API_URL_AUTH: string = Constants.API_URL + "auth/";
}

export class TableNames {
  public static readonly Profiles: string = "profiles";
  public static readonly PendingProfiles: string = "pending_profiles";
  public static readonly Clubs: string = "Clubs";
  public static readonly Category: string = "Category";
  public static readonly Documents: string = "Documents";
  public static readonly Events: string = "Events";
  public static readonly Forums: string = "Forums";
  public static readonly Meetings: string = "Meetings";
  public static readonly Messages: string = "Messages";
  public static readonly Notifications: string = "Notifications";
  public static readonly Publications: string = "Publications";
  public static readonly ClubActivity: string = "club_activity";
  public static readonly Budget: string = "Budget";
}

export class StorageNames {
  public static readonly BudgetEvent: string = "Budget_event";
  public static readonly EventImages: string = "Events_images";
  public static readonly ClubsLogo: string = "Clubs_Logo";

}