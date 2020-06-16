import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProcessesStoreService } from 'src/app/processes/services/processes-store.service';
import { keyframes } from '@angular/animations';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  processForm: FormGroup;

  processTemplates;

  newProcess;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DetailComponent>,
    private formBuilder: FormBuilder,

    private processesStoreService: ProcessesStoreService,
  ) { }

  ngOnInit() {
    this.processesStoreService.getProcessTemplates()
      .subscribe(response => this.processTemplates = response);

    this.processForm = this.formBuilder.group({
      description: ['', Validators.required],
      endDate: ['', Validators.required],
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      team: [''],
      owner: ['', Validators.required],
    });
  }

  onSelectProcessTemplate(template: any) {
    this.newProcess = template;
    this.processForm.get('name').setValue(template.name);
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void {
    const today = new Date().toISOString();
    const endDate = this.processForm.get('endDate').value;
    this.processForm.get('endDate').setValue(endDate.toISOString());
    this.processForm.get('startDate').setValue(today);

    this.newProcess = {
      ...this.newProcess,
      description: this.processForm.get('description').value,
      endDate: this.processForm.get('endDate').value,
      name: this.processForm.get('name').value,
      owner: this.processForm.get('owner').value,
      startDate: this.processForm.get('startDate').value,
    }

    delete this.newProcess.key;
    this.dialogRef.close(this.newProcess);
  }
}
