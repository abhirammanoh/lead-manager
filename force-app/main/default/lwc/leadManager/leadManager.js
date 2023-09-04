import { LightningElement } from 'lwc';
const columns=[
        {label: 'Name',fieldName:'Name'},
        {label:'Company',fieldName:'Company'},
        {label:'State',fieldName:'State'},
        {label:'Email',fieldName:'Email'}
];
export default class LeadManager extends LightningElement {
    columns=columns;
    data=[
        {Name:'xav',Company:'xcorp',State:'NZ',Email:'test1@test.com'},
        {Name:'dav',Company:'delta',State:'BM',Email:'test2@test.com'},
        {Name:'jim',Company:'sigma',State:'LS',Email:'test3@test.com'},
        {Name:'ross',Company:'meta',State:'DG',Email:'test4@test.com'}
    ];
}