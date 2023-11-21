import { ObserversModule } from '@angular/cdk/observers';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormMedicoViewModel } from '../models/form-medico.view-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { MedicoService } from '../services/medico.service';

@Component({
  selector: 'app-editar-medico',
  templateUrl: './editar-medico.component.html',
  styleUrls: ['./editar-medico.component.scss']
})
export class EditarMedicoComponent extends BaseFormComponent implements OnInit{
  
  medico$!: Observable<FormMedicoViewModel>
  formMedico!: FormGroup;

  constructor(private medicoService: MedicoService,
    private formBuilder: FormBuilder,
    private notificacao: NotificationService,
    private router: Router,
    private route: ActivatedRoute) {super()}

    
    ngOnInit(): void {

      this.medico$ = this.route.snapshot.data['medico'];

      this.formMedico = this.formBuilder.group({
        nome: ['', [Validators.required, Validators.minLength(3)]],
        telefone: ['', [Validators.required, Validators.pattern(/^[1-9]{2} [0-9]{4,5}-[0-9]{4}$/)]],
        email: ['', [Validators.required, Validators.email]],
        cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
        cep: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
        crm: ['', [Validators.required, Validators.pattern('^\\d{5}-[A-Z]{2}$')]],
        foto: [''],
    })

    this.formMedico.patchValue(this.medico$);
  }

  public gravar(){
    if(this.formMedico.invalid)
    {
      this.notificacao.aviso("O formulário deve ser preenchido corretamente!");
      this.exibirMensagensValidacao(this.formMedico);
      return;
    }
    const id = this.route.snapshot.paramMap.get('id');
  
    const medicoVM = this.formMedico.value; 
  
    this.medicoService.editar(medicoVM, id!)
    .subscribe({
      next: (medico) => this.processarSucesso(medico),
      error: (erro) => this.processarErro(erro)
    })
  }

  private processarSucesso(medico: FormMedicoViewModel){
    this.notificacao.sucesso(`O medico ${medico.nome} foi editado com sucesso!`)
    this.router.navigate(['/medicos/listar'])
  }

  private processarErro(erro: any){
    this.notificacao.erro(erro);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const base64String = e.target?.result?.toString().split(',')[1];
            this.formMedico.get('foto')?.setValue(base64String);
        };
        reader.readAsDataURL(file);
    }
  }

  get nome() {
  return this.formMedico.get('nome');
}

get telefone() {
  return this.formMedico.get('telefone');
}

get email() {
  return this.formMedico.get('email');
}

get cep() {
  return this.formMedico.get('cep');
}

get cpf() {
  return this.formMedico.get('cpf');
}

get crm() {
  return this.formMedico.get('crm');
}

get foto() {
  return this.formMedico.get('foto');
}

}
