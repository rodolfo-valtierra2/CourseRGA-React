export class Project {
  _id: string | undefined;
  name: string = '';
  description: string = '';
  imageUrl: string = '';
  typeContractId: number | undefined;
  signed_at: Date = new Date();
  budget: number = 0;
  isActive: boolean = false;

  constructor(initializer?: any) {
    if (!initializer) return;
    if (initializer._id) this._id = initializer._id;
    if (initializer.name) this.name = initializer.name;
    if (initializer.description) this.description = initializer.description;
    if (initializer.imageUrl) this.imageUrl = initializer.imageUrl;
    if (initializer.typeContractId)
      this.typeContractId = initializer.typeContractId;
    if (initializer.signed_at)
      this.signed_at = new Date(initializer.signed_at);
    if (initializer.budget) this.budget = initializer.budget;
    if (initializer.isActive) this.isActive = initializer.isActive;
  }
}
