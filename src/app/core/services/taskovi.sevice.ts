import { inject, Injectable } from "@angular/core";
import { API_CONFIG } from "../api/api.config";
import { HttpClient } from "@angular/common/http";
import { Prioritet, Task } from "../models/task.models";
import { Observable } from "rxjs";


@Injectable({providedIn: 'root'})
export class TaskoviService{
    private readonly http = inject(HttpClient)
    private readonly baseUrl = API_CONFIG.baseUrl

    getTasks(prioritet?:Prioritet): Observable<Task[]>{
        const params = prioritet ? {prioritet: prioritet} : {};
        return this.http.get<Task[]>(`${this.baseUrl}${API_CONFIG.taskovi.sviTaskovi}`,{});
    }}