import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Questionnaire } from './Questionnaire';

@Injectable({
  providedIn: 'root',
})

export class QuestionnaireService {
    private resourceUrl = 'questionnaires';
    private httpClient: any;
    private fullUrl=''; 

    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string,) {
        this.httpClient = http;
        this.fullUrl = baseUrl + this.resourceUrl;
    }

   
    public Create(questionnaire: Questionnaire): Observable<number> 
    {
        return this.http.post<number>(this.fullUrl, questionnaire);
    }

    public Read(id: string): Observable<Questionnaire> 
    {
        var resourceUrl = this.fullUrl + '/' + id;
        return this.http.get<Questionnaire>(resourceUrl);
    }

    public Update(questionnaire: Questionnaire): Observable<boolean> 
    {
        return this.http.put<boolean>(this.fullUrl, questionnaire);
    }

    public Delete(id: number): Observable<boolean> 
    {
        var resourceUrl = this.fullUrl + '/' + id;
        return this.http.delete<boolean>(resourceUrl);
    }

    // 
    // Filter Questionnaires for View and Data
    // 1. View: a) list, b) details
    // 2. Data: a) unresponsed Questionnaires b) responsed Questionnaires  
    //
    public List(viewfilter: string = '', datafilter: string = ''): Observable<Questionnaire[]>  
    {
        return this.http.get<Questionnaire[]>(this.fullUrl + '/' + viewfilter + '/' + datafilter);
    }

    GetFromDOM(document: any) : Observable<Questionnaire> 
    {
        return new Observable<Questionnaire>((observer) => {
            // Emit a value (in this case, a number)
            //observer.next(42);
            
            var questionnaireIdElement = <HTMLInputElement> document.getElementsByName('questionnaire-id')[0];
            var questionnaireAuthorElement = <HTMLInputElement> document.getElementsByName('questionnaire-author')[0];
            var questionnaireTopicElement = <HTMLInputElement> document.getElementsByName('questionnaire-topic')[0];
            var questionnaireResponseAuthorElement = <HTMLInputElement> document.getElementsByName('questionnaire-responseauthor')[0];

            var newquestionnaire: Questionnaire = 
            {
                id: parseInt(questionnaireIdElement.value),
                author: questionnaireAuthorElement.value,
                topic: questionnaireTopicElement.value,
                responseAuthor: questionnaireResponseAuthorElement.value,
                dialogs:  new Map<string, string>()
            }

            var answers = document.getElementsByName('answer-text');
            var questions = document.getElementsByName('question-text');
                    
            for (let index = 0; index < answers.length; index++)
            {
                var answerElement = <HTMLTextAreaElement>answers[index];
                var answerText = answerElement.value;

                var questionElement = <HTMLTextAreaElement>questions[index];
                var questionText = questionElement.value;

                newquestionnaire.dialogs.set(questionText, answerText);
            }

            observer.next(newquestionnaire);

            // Complete the observable
            observer.complete();
        });        
    }
}