/**
 * Function to create the taxonomic service form
 */
const CreateForm = () => {
  const form = FormApp.getActiveForm();

  /* Remove existing fields */
  const formItems = form.getItems();

  formItems.forEach((_item, index) => {
    form.deleteItem(index);
  });

  /* Create Form Fields */
  (() => {
    /* License (Required) */
    CreateLicenseField(form, 'Service License');

    /* Available Languages (Required) */
    CreateAvailableLanguagesField(form);

    /* Version */
    CreateVersionField(form);

    /* Topic Discipline */
    CreateTopicDisciplineField(form);

    /* Taxonomic Range */
    CreateTaxonomicRangeField(form);

    /* Documentation URL */
    CreateDocumentationURLField(form);

    /* Service Section */
    CreateServiceSection(form);

    /* Contact Point Section */
    CreateContactPointSection(form);

    /* Maintainer Sections 1 till 3 */
    for (let index = 1; index <= 3; index++) {
      CreateMaintainerSection(form, index);
    };

    /* Funding Section */
    CreateFundingSchemaSection(form);

    /* Software Section */
    CreateSoftwareSourceCodeSection(form);

    /* Associated Media Sections 1 till 3 */
    for (let index = 1; index <= 3; index++) {
      CreateAssociatedMediaSection(form, index);
    };
  })();
};

