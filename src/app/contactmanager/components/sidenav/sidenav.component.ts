import { Component, OnInit, NgZone } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  users: Observable<User[]>;

  constructor(zone: NgZone, private userService: UserService) {
    // use zone.run because NgZone does not wrap the matchMedia; basically adds a watch to mediaMatcher; runs change detection scan manually
    // if you don't do this the sidenav won't change when resizing the screen
    this.mediaMatcher.addListener(mql => zone.run(() => this.mediaMatcher = mql ));
   }

  ngOnInit() {
    this.users = this.userService.users
    this.userService.loadAll();

    this.users.subscribe(data => {
      console.log(data);
    })
  }

  isScreenSmall(): boolean {
    // will be true if screen size is under 720 px
    return this.mediaMatcher.matches;
  }

}
