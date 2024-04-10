/* Import Dependencies */
import { writeFileSync } from 'fs'
import { compileFromFile } from "json-schema-to-typescript";
import { resolve } from 'path';


/* Taxonomic Service */
const TaxonomicService = async () => {
    writeFileSync('types/TaxonomicService.d.ts', await compileFromFile(resolve(__dirname, '../sources/dataModel', 'taxonomic_service.json'), {}));
}


TaxonomicService();