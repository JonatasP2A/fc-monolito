import Id from "../../../@shared/domain/value-object/id.value-object"
import Transaction from "../../domain/transaction"
import ProcessPaymentUsecase from "./process-payment.usecase"

const transaction = new Transaction({
  id: new Id("1"),
  amount: 100,
  orderId: "1",
  status: "approved",
})

const MockRepositoryApproved = () => {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(transaction)),
  }
}

const transaction2 = new Transaction({
  id: new Id("1"),
  amount: 50,
  orderId: "1",
  status: "declined",
})

const MockRepositotyDeclined = () => {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(transaction2)),
  }
}

describe("ProcessPaymentUsecase unit test", () => {
  it("should approve a transaction", async () => {
    const paymentRepository = MockRepositoryApproved()
    const usecase = new ProcessPaymentUsecase(paymentRepository)

    const input = {
      orderId: "1",
      amount: 100,
    }

    const output = await usecase.execute(input)

    expect(paymentRepository.save).toHaveBeenCalled()
    expect(output.transactionId).toBe("1")
    expect(output.orderId).toBe("1")
    expect(output.amount).toBe(100)
    expect(output.status).toBe("approved")
    expect(output.createdAt).toStrictEqual(transaction.createdAt)
    expect(output.updatedAt).toStrictEqual(transaction.updatedAt)
  })

  it("should decline a transaction", async () => {
    const paymentRepository = MockRepositotyDeclined()
    const usecase = new ProcessPaymentUsecase(paymentRepository)

    const input = {
      orderId: "1",
      amount: 50,
    }

    const output = await usecase.execute(input)

    expect(paymentRepository.save).toHaveBeenCalled()
    expect(output.transactionId).toBe("1")
    expect(output.orderId).toBe("1")
    expect(output.amount).toBe(50)
    expect(output.status).toBe("declined")
    expect(output.createdAt).toStrictEqual(transaction2.createdAt)
    expect(output.updatedAt).toStrictEqual(transaction2.updatedAt)
  })
})