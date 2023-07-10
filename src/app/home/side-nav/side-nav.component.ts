import { Component } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  time: string = ""
  date: string = ""

  ngOnInit()
  {
    this.updateDateTime()
  }

  updateDateTime() {
    setInterval(() => {
      const currentDateTime = new Date();
      this.time = currentDateTime.toLocaleTimeString();
      this.date = currentDateTime.toLocaleDateString();
    }, 1000);
  }
}
