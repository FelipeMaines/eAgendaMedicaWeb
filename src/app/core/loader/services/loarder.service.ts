import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class LoaderService {
    public isLoading = new BehaviorSubject<boolean>(false);

    show(){
        this.isLoading.next(true);
        console.log('loading')
    }

    hide(){
        this.isLoading.next(false);
        console.log('hiding')

    }

    estaCarregando(){
        return this.isLoading.asObservable();
    }
}