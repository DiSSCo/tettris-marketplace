/* Import Dependencies */
import { writeFileSync } from 'fs'
import { compileFromFile } from "json-schema-to-typescript";
import { resolve } from 'path';


/* Taxonomic Service */
const TaxonomicService = async () => {
    writeFileSync(resolve(__dirname, './types', 'TaxonomicService.d.ts'), await compileFromFile(resolve(__dirname, '../sources/dataModel', 'taxonomic-service.json'), {}));
}

const TaxonomicExpert = async () => {
    writeFileSync(resolve(__dirname, './types', 'TaxonomicExpert.d.ts'), await compileFromFile(resolve(__dirname, '../sources/dataModel', 'taxonomic-expert.json'), {}));
}

TaxonomicService();
TaxonomicExpert();