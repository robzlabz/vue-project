<template>
  <div class="dashboard-home">
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">
          <span class="material-icons">payments</span>
        </div>
        <div class="stat-content">
          <h3>Total Sales</h3>
          <p class="stat-value">$45,678</p>
          <p class="stat-change positive">+12.5% <span class="material-icons">trending_up</span></p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <span class="material-icons">shopping_cart</span>
        </div>
        <div class="stat-content">
          <h3>Total Purchases</h3>
          <p class="stat-value">$32,456</p>
          <p class="stat-change negative">-5.2% <span class="material-icons">trending_down</span></p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <span class="material-icons">account_balance_wallet</span>
        </div>
        <div class="stat-content">
          <h3>Net Profit</h3>
          <p class="stat-value">$13,222</p>
          <p class="stat-change positive">+8.3% <span class="material-icons">trending_up</span></p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <span class="material-icons">inventory</span>
        </div>
        <div class="stat-content">
          <h3>Total Items</h3>
          <p class="stat-value">1,234</p>
          <p class="stat-change positive">+3.7% <span class="material-icons">trending_up</span></p>
        </div>
      </div>
    </div>

    <div class="dashboard-grid">
      <div class="dashboard-card">
        <h3>Recent Sales</h3>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="sale in recentSales" :key="sale.id">
                <td>#{{ sale.invoice }}</td>
                <td>{{ sale.customer }}</td>
                <td>${{ sale.amount }}</td>
                <td><span :class="['status', sale.status.toLowerCase()]">{{ sale.status }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="dashboard-card">
        <h3>Recent Purchases</h3>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Order</th>
                <th>Supplier</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="purchase in recentPurchases" :key="purchase.id">
                <td>#{{ purchase.order }}</td>
                <td>{{ purchase.supplier }}</td>
                <td>${{ purchase.amount }}</td>
                <td><span :class="['status', purchase.status.toLowerCase()]">{{ purchase.status }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const recentSales = ref([
  { id: 1, invoice: 'INV-001', customer: 'John Doe', amount: '1,200', status: 'Paid' },
  { id: 2, invoice: 'INV-002', customer: 'Jane Smith', amount: '850', status: 'Pending' },
  { id: 3, invoice: 'INV-003', customer: 'Bob Johnson', amount: '2,300', status: 'Paid' },
  { id: 4, invoice: 'INV-004', customer: 'Alice Brown', amount: '750', status: 'Overdue' },
])

const recentPurchases = ref([
  { id: 1, order: 'PO-001', supplier: 'Tech Supplies Inc', amount: '3,500', status: 'Received' },
  { id: 2, order: 'PO-002', supplier: 'Office Mart', amount: '1,200', status: 'Pending' },
  { id: 3, order: 'PO-003', supplier: 'Global Traders', amount: '2,800', status: 'Received' },
  { id: 4, order: 'PO-004', supplier: 'Best Equipment', amount: '950', status: 'Processing' },
])
</script>

<style scoped>
.dashboard-home {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  background: #e3f2fd;
  padding: 1rem;
  border-radius: 8px;
}

.stat-icon .material-icons {
  color: #1976d2;
  font-size: 2rem;
}

.stat-content h3 {
  margin: 0;
  font-size: 0.875rem;
  color: #666;
}

.stat-value {
  margin: 0.5rem 0;
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
}

.stat-change {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin: 0;
  font-size: 0.875rem;
}

.stat-change.positive {
  color: #4caf50;
}

.stat-change.negative {
  color: #f44336;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
}

.dashboard-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dashboard-card h3 {
  margin: 0 0 1rem 0;
  color: #2c3e50;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  font-weight: 600;
  color: #666;
}

.status {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
}

.status.paid, .status.received {
  background: #e8f5e9;
  color: #4caf50;
}

.status.pending, .status.processing {
  background: #fff3e0;
  color: #ff9800;
}

.status.overdue {
  background: #ffebee;
  color: #f44336;
}

@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}
</style>
