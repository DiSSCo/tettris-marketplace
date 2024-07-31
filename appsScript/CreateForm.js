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
     /* Service Section (Required) */
    CreateServiceSection(form);

    /* License (Required) */
    CreateLicenseField(form, 'Service License', 'Depending on the resource type a licence for the knowledge product contents.', 'service');

    /* Available Languages (Required) */
    CreateAvailableLanguagesField(form);

    /* Version */
    CreateVersionField(form);

    /* Topic Discipline */
    CreateTopicDisciplineField(form);

    /* Taxonomic Range */
    CreateTaxonomicRangeField(form);

    /* Geographic Area */
    CreateGeographicAreaField(form);

    /* Documentation URL */
    CreateDocumentationURLField(form);

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

