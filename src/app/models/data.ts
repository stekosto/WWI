export interface Data {
  category: string,
  subcategories: [{
                name: string,
                items: [{
                        name: string,
                        description: string,
                        price: number,
                        imagelink: string,
                        rating: number,
                        stock: number,
                        category: string,
                        subcategory: string
                      }]
                }]
}
