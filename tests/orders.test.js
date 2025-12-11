// tests/orders.test.js
const { create, get, list, edit } = require('../orders');
const orderData = require('../data/order1.json');
const productTestHelper = require('./test-utils/productTestHelper');

describe('Orders Module', () => {
 
  let createdOrder;

  // Populate the database with dummy data
  beforeAll(async () => {
    await productTestHelper.setupTestData();
    await productTestHelper.createTestOrders(5);
  });

  afterAll(async () => {
    await productTestHelper.cleanupTestData();
  });

  describe('create', () => {
    it('should create an order', async () => {
      createdOrder = await create(orderData);
      expect(createdOrder).toBeDefined();
      expect(createdOrder.buyerEmail).toBe(orderData.buyerEmail);
    });
  });

  describe('list', () => {
    it('should list orders', async () => {
      const orders = await list();
      expect(orders.length).toBeGreaterThan(4);
    });
  });

  // TASK 1: Add "get" test to orders
  describe('get', () => {
    it('should get an order by id', async () => {
      // Get the order using the createdOrder._id
      const order = await get(createdOrder._id);

      // Assertions
      expect(order).toBeDefined();
      expect(order._id).toBe(createdOrder._id);
      expect(order.buyerEmail).toBe(orderData.buyerEmail);
      expect(order.products).toBeDefined();
      expect(Array.isArray(order.products)).toBe(true);
    });
  });

  // TASK 2: Add "edit" test to orders
  describe('edit', () => {
    it('should edit an order', async () => {
      // Define the change to make
      const change = { 
        status: 'COMPLETED'
      };

      // Call the edit method
      const editedOrder = await edit(createdOrder._id, change);

      // Assertions
      expect(editedOrder).toBeDefined();
      expect(editedOrder._id).toBe(createdOrder._id);
      expect(editedOrder.status).toBe('COMPLETED');
      expect(editedOrder.buyerEmail).toBe(orderData.buyerEmail);
    });
  });
});