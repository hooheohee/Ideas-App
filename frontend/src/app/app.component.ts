import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "./store/app-store.module";
import { AddError } from "./store/actions/errors.action";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "ideas-app-frontend";

  // constructor(private store: Store<AppState>) {}

  // ngOnInit() {
  //   this.store.dispatch(new AddError({ error: "message!" }));
  // }
}
