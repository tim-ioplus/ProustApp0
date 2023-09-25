import { Component, Inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-questlist',
    templateUrl: './questlist.component.html'
 })
 export class QuestListComponent
 {
    public questionnaire: Questionnaire = 
    {
        id: 0,
        author: '',
        topic: '',
        responseAuthor: '',
        dialogs: {}    
     }
    
    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string)
    {
        // @Todo replace subscribe with observable
        var fullurl = baseUrl+ 'questlist';
        http.get<Questionnaire>(fullurl).subscribe(result => 
        {            
            this.questionnaire = result;
        }, 
        error => console.error(error));
    }

    public getDictionaryKeys()
    {
        var mkeys: string[] = []; 
        console.log("dialogs" + this.questionnaire.dialogs + "\n" + "--- --- ---");
        var mkeys = Object.getOwnPropertyNames(this.questionnaire.dialogs);
        console.log("mkeys" + mkeys + "\n" + " - - -");
        return mkeys;
    }
 }

 interface Questionnaire
 {
    id: number;
    author: string;
    topic: string;
    responseAuthor: string;
    dialogs: {[key: string]: string};
 }



