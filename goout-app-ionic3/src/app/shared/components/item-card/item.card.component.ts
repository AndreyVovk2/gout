import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
    templateUrl: 'item-card.html',
    selector: 'item-card',
    animations: [
        trigger('popCard', [
            state('show', style({
                marginTop: '6px'
            })),
            transition('void => show', [
                style({
                    opacity: '0'
                }),
                animate('0.3s ease-out')
            ])
        ])
    ]
})

export class ItemCardComponent implements OnInit {

    @Input() person: any = {};
    @Input() type: any = 'friend';
    @Output() showModal = new EventEmitter;
    @Output() showInvitePhone = new EventEmitter;
    public avatar: boolean = true;

    constructor() {
    }

    ngOnInit() {
        this.imageExists();

    }

    // ionViewDidLoad() {
//   console.log(this.type);
// }

    invite() {
        this.showModal.emit(this.person.id)
    }

    InvitePhone(status) {
        this.showInvitePhone.emit(status);
    }

    imageExists() {
        var img = new Image();
        img.onload = () => {
            this.avatar = true;
        };
        img.onerror = () => {
            this.avatar = false;
        };
        img.src = this.person.avatar_src;
    }


}
