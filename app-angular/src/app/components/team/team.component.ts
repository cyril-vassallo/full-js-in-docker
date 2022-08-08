import { Component, OnInit, Input } from '@angular/core';
import { UserInterface } from '../../Interfaces/Interfaces';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
  @Input() users: UserInterface[] | null = null;
  @Input() handleTeamPartnerTasks!: (teamPartner: UserInterface) => void;

  constructor() {}

  ngOnInit(): void {}

  onTeamPartnerClick(teamPartner: UserInterface): void {
    this.handleTeamPartnerTasks(teamPartner);
  }
}
