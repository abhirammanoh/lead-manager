import { LightningElement,wire,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import leads from '@salesforce/apex/LeadManagerCtrl.LeadData';
import totalLeads from '@salesforce/apex/LeadManagerCtrl.LeadCount';
import insertLeads from '@salesforce/apex/LeadManagerCtrl.InsertLeads';
import orgName from '@salesforce/label/c.connected_org';
const columns=[
        {label: 'Name',fieldName:'name'},
        {label:'Company',fieldName:'company'},
        {label:'Email',fieldName:'email'},
        {label:'Industry',fieldName:'industry'}
];
export default class LeadManager extends LightningElement {
    columns=columns;
    orgName=orgName;

    help=true;
    importConfirmation=false;

    systemLeads;
    totalRecords;
    insertResult;
    upload;
    error;
    @api
    leadData;
    //fetch data from external system
    connectedCallback(){
        leads()
           .then(result=>{
            this.leadData=result
            this.totalRecords=this.leadData.length;
           })
           .catch(error=>{
            this.error=error;
           })
        }
    //fetch from own system
    @wire(totalLeads) 
    systemLeads;
    //to insert leads to system
    importLeads(){
        this.importConfirmation=true;
    }
    helpText(){
        this.help=false;
    }

    //modal
    leave(){
        this.importConfirmation=false;
    }
    proceed(){
        this.upload=JSON.stringify(this.leadData);
        this.importConfirmation=false;
        insertLeads({newLead:this.upload})
        .then(result=>{
            this.insertResult=result;
           
            console.log(this.insertResult);
            this.showNotification();
            
        })
        .catch(error=>{
            this.error=error;
        })
    }
    showNotification(){
        if(this.insertResult==='ok'){
            const evt=new ShowToastEvent({title:'Records Imported',message:'More leads now!',variant:'success'});
            this.dispatchEvent(evt);
        }
        else{
            const evt=new ShowToastEvent({title:'Import Failed',message:this.insertResult,variant:'error'});
            this.dispatchEvent(evt);
        }
    }
    refreshLeads(){
        const evt=new ShowToastEvent({
            title:'Records Imported',
            message:'More leads now!',
            variant:'success'
        });
            this.dispatchEvent(evt);
            console.log(evt);
    }
    leadSearch(event){
        const key=event.target.value.toLowerCase();
        
    }
   
}