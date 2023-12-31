import { Request, Response } from 'express'
import Product from '../models/Product'
import OwnerPick from '../models/OwnerPick'

const ownerPickCtrl = {
  create: async(req: Request, res: Response) => {
    try {
      const { product } = req.body
      const isProductFound = await Product.findById(product)
      if (!isProductFound)
        return res.status(404).json({ msg: `Product with ID ${product} not found.` })

      const isPicked = await OwnerPick.findOne({ product })
      if (isPicked)
        return res.status(400).json({ msg: `Product with ID has been listed on owner's pick.` })

      const totalData = await OwnerPick.countDocuments()
      if (totalData === 4)
        return res.status(400).json({ msg: 'Only 4 products can be listed on owner\'s pick section.' })

      const newOwnerPick = new OwnerPick({ product })
      await newOwnerPick.save()

      return res.status(200).json({
        msg: `Product with ID ${product} has been listed successfully on owner's pick section.`,
        ownerPick: {
          ...newOwnerPick._doc,
          product: isProductFound
        }
      })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  read: async(req: Request, res: Response) => {
    try {
      const ownerPickAggregation = await OwnerPick.aggregate([
        {
          $facet: {
            data: [
              {
                $lookup: {
                  'from': 'products',
                  'localField': 'product',
                  'foreignField': '_id',
                  'as': 'product'
                }
              },
              { $unwind: '$product' },
              {
                $lookup: {
                  'from': 'productdiscounts',
                  'localField': 'product._id',
                  'foreignField': 'product',
                  'as': 'discount'
                }
              },
              {
                $unwind: {
                  path: '$discount',
                  preserveNullAndEmptyArrays: true
                }
              },
              {
                $match: {
                  $or: [
                    { 'discount.active': 0 },
                    { 'discount.active': 1 },
                    { 'discount.active': -1 },
                    { 'discount': {$exists: false} }
                  ]
                }
              },
              {
                $group: {
                  _id: '$_id',
                  product: {
                    $first: {
                      _id: '$product._id',
                      name: '$product.name',
                      shortDescription: '$product.shortDescription',
                      longDescription: '$product.longDescription',
                      price: '$product.price',
                      weight: '$product.weight',
                      width: '$product.width',
                      length: '$product.length',
                      height: '$product.height',
                      category: '$product.category',
                      colors: '$product.colors',
                      images: '$product.images',
                      sizeChart: '$product.sizeChart',
                      discount: {
                        $max: {
                          $cond: {
                            if: { $eq: ['$discount.active', 1] },
                            then: '$discount.percentage',
                            else: 0
                          }
                        }
                      }
                    }
                  }
                }
              },
              { $sort: { createdAt: -1 } }
            ]
          }
        },
        {
          $project: {
            data: 1
          }
        }
      ])
      // const ownerPick = await OwnerPick.find().sort('-createdAt').populate('product')
      return res.status(200).json({ ownerPick: ownerPickAggregation[0].data })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  update: async(req: Request, res: Response) => {
    try {
      const { id } = req.params
      const { product } = req.body

      const ownerPick = await OwnerPick.findById(id)
      if (!ownerPick)
        return res.status(404).json({ msg: `Owner's pick with ID ${id} not found.` })

      const isProductFound = await Product.findById(product)
      if (!isProductFound)
        return res.status(404).json({ msg: `Product with ID ${product} not found` })

      await OwnerPick.findByIdAndUpdate(id, { product })

      return res.status(200).json({
        msg: `Owner's pick with ID ${id} has been updated su ccessfully.`,
        ownerPick: {
          ...ownerPick._doc,
          product: isProductFound
        }
      })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  delete: async(req: Request, res: Response) => {
    try {
      const { id } = req.params

      const ownerPick = await OwnerPick.findById(id)
      if (!ownerPick)
        return res.status(404).json({ msg: `Owner pick with ID ${id} not found.` })

      await OwnerPick.findByIdAndDelete(id)
      return res.status(200).json({ msg: `Owner's pick with ID ${id} has been deleted successfully.` })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

export default ownerPickCtrl