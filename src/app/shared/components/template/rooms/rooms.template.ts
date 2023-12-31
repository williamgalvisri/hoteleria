import { ActivatedRoute, Route, Router } from '@angular/router';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { RoomRepository } from '@repositories/room/room.repository';
import { ButtonAtom } from '@shared/components/atoms/button/button.atom';
import { LabelAtom } from '@shared/components/atoms/label/label.atom';
import { Subscription, iif, of, switchMap, tap } from 'rxjs';
import { RepositoryModule } from '@repositories/repository.module';
import { ModalMolecule } from '@shared/components/atoms/modal/modal.molecule';
import { Room } from '@models/room.model';
import { Modal } from 'flowbite';
import { ModalService } from '@shared/components/atoms/modal/service/modal.service';
import { ID_MODAL_FORM_ROOM } from '@shared/components/utils/modal-keys.const';
import { FormRoomOrganism } from '@shared/components/organisms/form-room/form-room.organism';
import { NumberMolecule } from '@shared/components/molecules/number-input/number-input.molecule';
import { CommonModule } from '@angular/common';
import { CardAtom } from '@shared/components/atoms/card/card.atom';
import { GetTextFromOptionPipe } from '@shared/pipes/get-text-from-options.pipe';
import { OptionType } from '@shared/components/atoms/select/model/select.model';
import { TAX_OPTION, TYPE_ROOM_OPTION } from '@shared/components/utils/dummy-option.const';
import { BreadcrumService } from '@shared/components/atoms/breadcrum/service/breadcrum.service';
import { SkeletonAtom } from '@shared/components/atoms/skeleton/skeleton.atom';

const COMPONENTS = [
  LabelAtom,
  ButtonAtom,
  ModalMolecule,
  FormRoomOrganism,
  CardAtom,
  GetTextFromOptionPipe,
  SkeletonAtom
];

const MODULE = [
  RepositoryModule,
  CommonModule
];
@Component({
  standalone: true,
  selector: 'tp-rooms',
  imports: [ ...MODULE, ...COMPONENTS],
  templateUrl: 'rooms.template.html'
})
export class RoomsTemplate implements OnInit, AfterViewInit, OnDestroy {
  rooms: Room[] = [];
  room: Room = new Room();
  idHotel: string = '';
  isLoading: boolean = true;

  typeRoomOptions: OptionType[] = TYPE_ROOM_OPTION;
  taxOptions: OptionType[] = TAX_OPTION;
  formRoomInstanceModal!: Modal;
  loadingState: { edit: boolean,  activateOrDeactivate: boolean};
  subscriptionListenerRooms!: Subscription;
  constructor(
    private activatedRoute: ActivatedRoute,
    private roomRepository: RoomRepository,
    private modalService: ModalService,
    private router: Router,
    private breadcrumService: BreadcrumService
  ) {
    this.loadingState = {
      edit: false,
      activateOrDeactivate: false
    };
  }

  ngOnInit() {
    this.getHotels();
  }

  ngOnDestroy(): void {
    this.subscriptionListenerRooms?.unsubscribe();
    this.roomRepository.unsubscribeSnapshot();
  }

  ngAfterViewInit(): void {
    this.formRoomInstanceModal = this.modalService.createInstanceModal(ID_MODAL_FORM_ROOM, {closable: false});
  }

  getHotels() {
    // Verify if exist id hotel. if not return to hotels
    this.subscriptionListenerRooms = this.activatedRoute.params
    .pipe(
      switchMap((param) => {
        const id = param['id'];
        this.idHotel = id;
        if (id) {
          return this.roomRepository.setHotelIdentifier(id)
        } else {
          return of(false)
        }
      }),
      switchMap((validateExist) => {
        if(!validateExist) {
          this.router.navigate(['admin/hotels'])
          return of()
        } else {
          return this.roomRepository.listenerRooms$().pipe(tap((rooms) => {
            this.rooms = rooms;
            this.isLoading = false;
          }))
        }
      })
    ).subscribe();
  }

  deactivateOrActivate(id: string, previewState: boolean) {
    this.loadingState.activateOrDeactivate = true;
    this.roomRepository.activateOrDeactivateRoom(id, previewState).pipe(
      tap(() => {
        // off loading state
        this.loadingState.activateOrDeactivate = false;
      })
    ).subscribe()
  }

  editRoom(id: string) {
    // Beggin search data
    this.loadingState.edit = true;
    this.roomRepository.getByIdRoom(id).pipe(
      tap(({response}) => {
        // off loading state and open modal
        this.loadingState.edit = false;
        this.room = response;
        this.formRoomInstanceModal.show();
      })
    ).subscribe()
  }

  goToReservas(id: string) {
    this.breadcrumService.setIdBreadCrum(this.idHotel, 'idHotel');
    this.router.navigate([`admin/${this.idHotel}/rooms/${id}`])
  }


  // -------------------- Modal Methods --------------------
  openFormRoomModal() {
    this.room = new Room()
    this.formRoomInstanceModal.show();
  }

  closeFormRoomModal() {
    this.formRoomInstanceModal.hide();
  }

}
