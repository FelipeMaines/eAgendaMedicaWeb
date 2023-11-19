import { Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable()
export class NotificationService{
    constructor(private snackBar: MatSnackBar){}

    sucesso(mensagem: string)
    {
        this.snackBar.open(mensagem, 'OK', {
            panelClass: ['snackbar-sucesso'],
            horizontalPosition: 'right',
            verticalPosition: "bottom",
        })
    }

    aviso(mensagem: string)
    {
        this.snackBar.open(mensagem, 'OK', {
            panelClass: ['snackbar-aviso'],
            horizontalPosition: 'right',
            verticalPosition: "bottom",
        })
    }

    erro(mensagem: string)
    {
        this.snackBar.open(mensagem, 'OK', {
            panelClass: ['snackbar-erro'],
            horizontalPosition: 'right',
            verticalPosition: "bottom",
        })
    }
}