import { Injectable } from "@angular/core";
import { NoNewVersionDetectedEvent, SwUpdate, VersionDetectedEvent, VersionInstallationFailedEvent, VersionReadyEvent } from "@angular/service-worker";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UpdateService {
  public updateDetected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public updateReady$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private updates: SwUpdate) {
    this.init();
  }

  public forceUpdate(): void {
    document.location.reload();
  }

  private init(): void {
    if (this.updates.isEnabled) {
      this.updates.versionUpdates.subscribe((event) => {
        if (event.type === "VERSION_DETECTED") {
          event = event as VersionDetectedEvent;
          console.log("VersionDetectedEvent : ", event.version);
          this.updateDetected$.next(true);
        }

        if (event.type === "VERSION_READY") {
          event = event as VersionReadyEvent;
          console.log("VersionReadyEvent : ", event);
          this.updateReady$.next(true);
        }
        if (event.type === "VERSION_INSTALLATION_FAILED") {
          event = event as VersionInstallationFailedEvent;
          console.log("VersionInstallationFailedEvent : ", event);
        }

        if (event.type === "NO_NEW_VERSION_DETECTED") {
          event = event as NoNewVersionDetectedEvent;
          console.log("NoNewVersionDetectedEvent : ", event);
        }
      });
    }
  }
}
