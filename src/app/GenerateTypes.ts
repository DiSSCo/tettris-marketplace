/* Import Dependencies */
import { writeFileSync } from 'fs'
import { compileFromFile } from "json-schema-to-typescript";
import { resolve } from 'path';


/* Taxonomic Service */
const TaxonomicService = async () => {
    writeFileSync('src/app/types/TaxonomicService.d.ts', await compileFromFile(resolve(__dirname, '../sources/dataModel', 'taxonomic-service.json'), {}));
}


TaxonomicService();