import BaseEntity from "../../@shared/domain/entity/base.entity"
import Id from "../../@shared/domain/value-object/id.value-object"

type InvoiceItemProps = {
  id?: Id
  invoice_id: string
  name: string
  price: number
}

export default class InvoiceItem extends BaseEntity {
  private _invoice_id: string
  private _name: string
  private _price: number

  constructor(props: InvoiceItemProps) {
    super(props.id)
    this._invoice_id = props.invoice_id
    this._name = props.name
    this._price = props.price
  }

  get invoice_id() {
    return this._invoice_id
  }

  get name() {
    return this._name
  }

  get price() {
    return this._price
  }
}