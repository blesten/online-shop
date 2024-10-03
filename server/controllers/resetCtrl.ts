import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import User from '../models/User'
import Category from '../models/Category'
import Product from '../models/Product'
import OwnerPick from '../models/OwnerPick'
import Cart from '../models/Cart'
import Checkout from '../models/Checkout'
import ProductDiscount from '../models/ProductDiscount'
import Review from '../models/Review'
import Wishlist from '../models/Wishlist'

const resetCtrl = {
  resetData: async(req: Request, res: Response) => {
    try {
      await Cart.deleteMany({})
      await Category.deleteMany({})
      await Checkout.deleteMany({})
      await OwnerPick.deleteMany({})
      await ProductDiscount.deleteMany({})
      await Product.deleteMany({})
      await Review.deleteMany({})
      await User.deleteMany({})
      await Wishlist.deleteMany({})

      const adminPassword = await bcrypt.hash('Admin1234_', 12)

      const admin = new User({
        name: 'Admin',
        email: 'admin@admin.com',
        password: adminPassword,
        role: 'admin'
      })
      await admin.save()

      const customerPassword = await bcrypt.hash('JohnDoe1234_', 12)
      
      const customer = new User({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: customerPassword
      })
      await customer.save()

      const jacket = new Category({
        name: 'Jackets',
        availableSizes: ['Small', 'Medium', 'Large'],
        availableSizeParameters: ['Chest Circumference', 'Body Length', 'Sleeve Length'],
        sizeChart: [
          {
            'size': 'Small',
            'Chest Circumference': '96',
            'Body Length': '60',
            'Sleeve Length': '51'
          },
          {
            'size': 'Medium',
            'Chest Circumference': '98',
            'Body Length': '61',
            'Sleeve Length': '52'
          },
          {
            'size': 'Large',
            'Chest Circumference': '100',
            'Body Length': '62',
            'Sleeve Length': '53'
          }
        ]
      })
      await jacket.save()

      const knitwear = new Category({
        name: 'Knitwear',
        availableSizes: ['Small', 'Medium', 'Large'],
        availableSizeParameters: ['Chest Width', 'Shirt Length', 'Sleeve Length'],
        sizeChart: [
          {
            'size': 'Small',
            'Chest Width': '94',
            'Shirt Length': '44',
            'Sleeve Length': '44'
          },
          {
            'size': 'Medium',
            'Chest Width': '97',
            'Shirt Length': '47',
            'Sleeve Length': '47'
          },
          {
            'size': 'Large',
            'Chest Width': '100',
            'Shirt Length': '50',
            'Sleeve Length': '50'
          }
        ]
      })
      await knitwear.save()

      const tShirts = new Category({
        name: 'T-Shirts',
        availableSizes: ['Small', 'Medium', 'Large'],
        availableSizeParameters: ['Width', 'Length'],
        sizeChart: [
          {
            'size': 'Small',
            'Width': '50',
            'Length': '70'
          },
          {
            'size': 'Medium',
            'Width': '53',
            'Length': '73'
          },
          {
            'size': 'Large',
            'Width': '56',
            'Length': '76'
          }
        ]
      })
      await tShirts.save()

      const footwear = new Category({
        name: 'Footwear',
        availableSizes: ['39', '40', '41', '42', '43', '44'],
        availableSizeParameters: ['Foot Length', 'Foot Width'],
        sizeChart: [
          {
            'size': '39',
            'Foot Length': '25,5',
            'Foot Width': '8,3'
          },
          {
            'size': '40',
            'Foot Length': '26,5',
            'Foot Width': '8,5'
          },
          {
            'size': '41',
            'Foot Length': '27',
            'Foot Width': '8,8'
          },
          {
            'size': '42',
            'Foot Length': '27,5',
            'Foot Width': '9'
          },
          {
            'size': '43',
            'Foot Length': '28,5',
            'Foot Width': '9,3'
          },
          {
            'size': '44',
            'Foot Length': '29,5',
            'Foot Width': '9,5'
          }
        ]
      })
      await footwear.save()

      const bottoms = new Category({
        name: 'Bottoms',
        availableSizes: ['Small', 'Medium', 'Large', 'X-Large'],
        availableSizeParameters: ['Waist Circumference', 'Hip Circumference', 'Thigh Circumference', 'Ankle Circumference', 'Pants Length'],
        sizeChart: [
          {
            'size': 'Small',
            'Waist Circumference': '68',
            'Hip Circumference': '95',
            'Thigh Circumference': '60',
            'Ankle Circumference': '47',
            'Pants Length': '101'
          },
          {
            'size': 'Mediium',
            'Waist Circumference': '72',
            'Hip Circumference': '100',
            'Thigh Circumference': '63',
            'Ankle Circumference': '48',
            'Pants Length': '103'
          },
          {
            'size': 'Large',
            'Waist Circumference': '75',
            'Hip Circumference': '105',
            'Thigh Circumference': '66',
            'Ankle Circumference': '49',
            'Pants Length': '105'
          },
          {
            'size': 'X-Large',
            'Waist Circumference': '80',
            'Hip Circumference': '110',
            'Thigh Circumference': '69',
            'Ankle Circumference': '50',
            'Pants Length': '105'
          }
        ]
      })
      await bottoms.save()

      const cropTop = new Category({
        name: 'Crop Top',
        availableSizes: ['Small', 'Medium', 'Large', 'X-Large'],
        availableSizeParameters: ['Chest Circumference', 'Waistline', 'Height'],
        sizeChart: [
          {
            'size': 'Small',
            'Chest Circumference': '74',
            'Waistline': '56',
            'Height': '40'
          },
          {
            'size': 'Medium',
            'Chest Circumference': '80',
            'Waistline': '60',
            'Height': '42'
          },
          {
            'size': 'Large',
            'Chest Circumference': '86',
            'Waistline': '64',
            'Height': '44'
          },
          {
            'size': 'X-Large',
            'Chest Circumference': '90',
            'Waistline': '68',
            'Height': '46'
          }
        ]
      })
      await cropTop.save()

      const jeansJacket = new Product({
        name: 'Jeans Jacket',
        shortDescription: 'Classic denim jacket, a timeless essential for versatile style',
        longDescription: "Denim's timeless allure meets modern style in our Jeans Jacket. Crafted for comfort and durability, this versatile piece effortlessly elevates any look. With its classic design and sturdy denim fabric, it's a wardrobe essential that adds an edge of cool to your ensemble.",
        price: 399000,
        weight: 250,
        width: 15,
        length: 15,
        height: 15,
        category: jacket._id,
        colors: [
          {
            'hexCode': '#fef1ec',
            'colorName': 'Cream',
            'sizes': [
              {
                'size': 'Small',
                'stock': 40
              },
              {
                'size': 'Medium',
                'stock': 60
              },
              {
                'size': 'Large',
                'stock': 40
              }
            ]
          },
          {
            'hexCode': '#9fe6fe',
            'colorName': 'Light Blue',
            'sizes': [
              {
                'size': 'Small',
                'stock': 60
              },
              {
                'size': 'Medium',
                'stock': 80
              },
              {
                'size': 'Large',
                'stock': 60
              }
            ]
          }
        ],
        images: [
          'https://res.cloudinary.com/dpef9sjqt/image/upload/v1704548724/Online%20Shop/products/sdvf3hycetphtuas6dvz.jpg',
          'https://res.cloudinary.com/dpef9sjqt/image/upload/v1704548725/Online%20Shop/products/hmejoggm5n0dhgigngfn.jpg',
          'https://res.cloudinary.com/dpef9sjqt/image/upload/v1704548727/Online%20Shop/products/jdm0v1cbscaycpjgy9hm.jpg'
        ],
        sizeChart: [
          {
            'size': 'Small',
            'Chest Circumference': '96',
            'Body Length': '60',
            'Sleeve Length': '51'
          },
          {
            'size': 'Medium',
            'Chest Circumference': '98',
            'Body Length': '61',
            'Sleeve Length': '52'
          },
          {
            'size': 'Large',
            'Chest Circumference': '100',
            'Body Length': '62',
            'Sleeve Length': '53'
          },
        ] 
      })
      await jeansJacket.save()

      const leatherJacket = new Product({
        name: 'Classic Black Leather Jacket',
        shortDescription: 'Timeless black leather jacket: sleek, high-quality, and effortlessly stylish',
        longDescription: 'Sleek and versatile, our Black Leather Jacket exudes timeless style. Crafted from high-quality leather, it boasts a tailored fit and a sleek design, perfect for any occasion. Elevate your outfit effortlessly with this iconic piece that adds an edgy touch to your look.',
        price: 599000,
        weight: 350,
        width: 15,
        length: 15,
        height: 15,
        category: jacket._id,
        colors: [
          {
            'hexCode': '#292929',
            'colorName': 'Black',
            'sizes': [
              {
                'size': 'Small',
                'stock': 20
              },
              {
                'size': 'Medium',
                'stock': 40
              },
              {
                'size': 'Large',
                'stock': 20
              }
            ]
          },
          {
            'hexCode': '#404040',
            'colorName': 'Dark Gray',
            'sizes': [
              {
                'size': 'Small',
                'stock': 40
              },
              {
                'size': 'Medium',
                'stock': 60
              },
              {
                'size': 'Large',
                'stock': 40
              }
            ]
          }
        ],
        images: [
          'https://res.cloudinary.com/dpef9sjqt/image/upload/v1704548439/Online%20Shop/products/grwj36tcmzxztitrm8w1.jpg',
          'https://res.cloudinary.com/dpef9sjqt/image/upload/v1704548440/Online%20Shop/products/oitfxcfffpwimaeqa4cg.jpg',
          'https://res.cloudinary.com/dpef9sjqt/image/upload/v1704548441/Online%20Shop/products/gc8y9tazowwhmfqpbmbv.jpg'
        ],
        sizeChart: [
          {
            'size': 'Small',
            'Chest Circumference': '96',
            'Body Length': '60',
            'Sleeve Length': '51'
          },
          {
            'size': 'Medium',
            'Chest Circumference': '98',
            'Body Length': '61',
            'Sleeve Length': '52'
          }, {
            'size': 'Large',
            'Chest Circumference': '100',
            'Body Length': '62',
            'Sleeve Length': '53'
          }
        ]
      })
      await leatherJacket.save()

      const dailyTshirt = new Product({
        name: 'Casual Daily T-Shirt',
        shortDescription: 'Effortlessly comfortable and casually stylish, our Daily Tee is your perfect everyday companion',
        longDescription: "Your go-to for everyday comfort, our Casual Daily T-Shirt combines effortless style with supreme comfort. Crafted from soft, breathable fabric, it's the perfect companion for any laid-back occasion.",
        price: 199000,
        weight: 10,
        width: 10,
        length: 10,
        height: 10,
        category: tShirts._id,
        colors: [
          {
            'hexCode': '#000000',
            'colorName': 'Black',
            'sizes': [
              {
                'size': 'Small',
                'stock': 200
              },
              {
                'size': 'Medium',
                'stock': 0
              },
              {
                'size': 'Large',
                'stock': 250
              }
            ]
          },
          {
            'hexCode': '#575757',
            'colorName': 'Dark Gray',
            'sizes': [
              {
                'size': 'Small',
                'stock': 200
              },
              {
                'size': 'Medium',
                'stock': 300
              },
              {
                'size': 'Large',
                'stock': 250
              }
            ]
          },
          {
            'hexCode': '#fafafa',
            'colorName': 'White',
            'sizes': [
              {
                'size': 'Small',
                'stock': 200
              },
              {
                'size': 'Medium',
                'stock': 400
              },
              {
                'size': 'Large',
                'stock': 300
              }
            ]
          }
        ],
        images: [
          'https://res.cloudinary.com/dpef9sjqt/image/upload/v1704549260/Online%20Shop/products/b8amxq5orr0y0dqxtw7i.jpg',
          'https://res.cloudinary.com/dpef9sjqt/image/upload/v1704549261/Online%20Shop/products/wpzpmcdigy1qnake19pn.jpg',
          'https://res.cloudinary.com/dpef9sjqt/image/upload/v1704549391/Online%20Shop/products/e0o0l2umbqj4pvr53veb.webp'
        ],
        sizeChart: [
          {
            'size': 'Small',
            'Width': '50',
            'Length': '70'
          },
          {
            'size': 'Medium',
            'Width': '53',
            'Length': '73'
          },
          {
            'size': 'Large',
            'Width': '56',
            'Length': '76'
          }
        ]
      })
      await dailyTshirt.save()

      const anklePant = new Product({
        name: 'Casual Ankle Pant',
        shortDescription: 'Relaxed, stylish pants ending just above the ankle for a casual vibe',
        longDescription: 'A casual ankle pant, often a relaxed and stylish trouser, sits above the ankle, providing versatility and comfort for everyday wear, blending a laid-back appeal with fashionable aesthetics.',
        price: 499000,
        weight: 250,
        width: 15,
        height: 15,
        length: 15,
        category: bottoms._id,
        colors: [
          {
            'hexCode': '#4d2500',
            'colorName': 'Dark Brown',
            'sizes': [
              {
                'size': 'Small',
                'stock': 20
              },
              {
                'size': 'Medium',
                'stock': 30
              },
              {
                'size': 'Large',
                'stock': 20
              },
              {
                'size': 'X-Large',
                'stock': 39
              }
            ]
          },
          {
            'hexCode': '#ffebdb',
            'colorName': 'Cream',
            'sizes': [
              {
                'size': 'Small',
                'stock': 20
              },
              {
                'size': 'Medium',
                'stock': 35
              },
              {
                'size': 'Large',
                'stock': 40
              },
              {
                'size': 'X-Large',
                'stock': 40
              }
            ]
          }
        ],
        images: [
          'https://res.cloudinary.com/dpef9sjqt/image/upload/v1704601141/Online%20Shop/products/mfh2u3qpj4xccfistlzi.jpg',
          'https://res.cloudinary.com/dpef9sjqt/image/upload/v1704601144/Online%20Shop/products/x5thuw37zoofimdz5xpa.jpg',
          'https://res.cloudinary.com/dpef9sjqt/image/upload/v1704601147/Online%20Shop/products/knu26wwlo3caml5osevj.jpg'
        ],
        sizeChart: [
          {
            'size': 'Small',
            'Waist Circumference': '68',
            'Hip Circumference': '95',
            'Thigh Circumference': '60',
            'Ankle Circumeference': '47',
            'Pants Length': '101'
          },
          {
            'size': 'Medium',
            'Waist Circumference': '72',
            'Hip Circumference': '100',
            'Thigh Circumference': '63',
            'Ankle Circumeference': '48',
            'Pants Length': '103'
          },
          {
            'size': 'Large',
            'Waist Circumference': '75',
            'Hip Circumference': '105',
            'Thigh Circumference': '66',
            'Ankle Circumeference': '49',
            'Pants Length': '105'
          },
          {
            'size': 'X-Large',
            'Waist Circumference': '80',
            'Hip Circumference': '110',
            'Thigh Circumference': '69',
            'Ankle Circumeference': '50',
            'Pants Length': '105'
          }
        ]
      })
      await anklePant.save()

      const chinosPant = new Product({
        name: 'Daily Chinos Pant',
        shortDescription: 'Stylishly comfortable, the "Daily Chinos Pant" offers timeless versatility',
        longDescription: 'The "Daily Chinos Pant" is your go-to choice for effortless style and comfort. Crafted from high-quality fabric, these versatile pants blend classic design with modern functionality. Perfect for any occasion, they offer a tailored fit and durability for everyday wear. Elevate your wardrobe with these essential, timeless chinos that effortlessly complement your personal style.',
        price: 399000,
        weight: 150,
        width: 15,
        length: 15,
        height: 15,
        category: bottoms._id,
        colors: [
          {
            'hexCode': '#474747',
            'colorName': 'Dark Gray',
            'sizes': [
              {
                'size': 'Small',
                'stock': 100
              },
              {
                'size': 'Medium',
                'stock': 200
              },
              {
                'size': 'Large',
                'stock': 200
              },
              {
                'size': 'X-Large',
                'stock': 100
              }
            ]
          },
          {
            'hexCode': '#feeae1',
            'colorName': 'Cream',
            'sizes': [
              {
                'size': 'Small',
                'stock': 100
              },
              {
                'size': 'Medium',
                'stock': 200
              },
              {
                'size': 'Large',
                'stock': 200
              },
              {
                'size': 'X-Large',
                'stock': 150
              }
            ]
          }
        ],
        images: [
          'https://res.cloudinary.com/dpef9sjqt/image/upload/v1704720687/Online%20Shop/products/mtrk30lpj9hl9zq34yul.jpg',
          'https://res.cloudinary.com/dpef9sjqt/image/upload/v1704720689/Online%20Shop/products/rtd2rbzzolsy4qpyyuru.jpg',
          'https://res.cloudinary.com/dpef9sjqt/image/upload/v1704720691/Online%20Shop/products/wsr6invvxnb4dopdgwbl.jpg'
        ],
        sizeChart: [
          {
            'size': 'Small',
            'Waist Circumference': '68',
            'Hip Circumference': '95',
            'Thigh Circumference': '60',
            'Ankle Circumeference': '47',
            'Pants Length': '101'
          },
          {
            'size': 'Medium',
            'Waist Circumference': '72',
            'Hip Circumference': '100',
            'Thigh Circumference': '63',
            'Ankle Circumeference': '48',
            'Pants Length': '103'
          },
          {
            'size': 'Large',
            'Waist Circumference': '75',
            'Hip Circumference': '105',
            'Thigh Circumference': '66',
            'Ankle Circumeference': '49',
            'Pants Length': '105'
          },
          {
            'size': 'X-Large',
            'Waist Circumference': '80',
            'Hip Circumference': '110',
            'Thigh Circumference': '69',
            'Ankle Circumeference': '50',
            'Pants Length': '105'
          }
        ]
      })
      await chinosPant.save()

      const ownerPicks1 = new OwnerPick({
        product: dailyTshirt._id
      })
      await ownerPicks1.save()

      const ownerPicks2 = new OwnerPick({
        product: anklePant._id
      })
      await ownerPicks2.save()

      const ownerPicks3 = new OwnerPick({
        product: jeansJacket._id
      })
      await ownerPicks3.save()

      const ownerPicks4 = new OwnerPick({
        product: chinosPant._id
      })
      await ownerPicks4.save()

      return res.status(200).json({ msg: 'Data has been reset successfully' })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

export default resetCtrl