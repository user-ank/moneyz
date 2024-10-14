import { StyleSheet, View, SafeAreaView, Text, ScrollView} from 'react-native';
import ExpenseSubHeader from '@/components/headers/ExpenseSubHeader';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import Transaction from '@/components/TransactionPage/Transaction';
import ThickLineFull from '@/components/ThickLineFull';
import { getDayDate } from '@/utils';

export default function Expense() {
  const db = useSQLiteContext();
  const [income, setIncome] = useState(500.36);
  const [expense, setExpense] = useState(1200);
  const transactions: Transaction[] =  [{"amount": 15, "category": "Snacks", "dateTime": "2024-10-07 09:00:00", "fromAccount": "SBI", "id": 1, "title": "Samosa", "type": "Expense"}, {"amount": 500, "category": "Clothing", "dateTime": "2024-10-08 10:00:00", "fromAccount": "Cash", "id": 2, "title": "Shoes", "type": "Expense"}, {"amount": 30, "category": "Canteen", "dateTime": "2024-10-11 12:00:00", "fromAccount": "SBI", "id": 4, "title": "Fried Rice", "type": "Expense"}, {"amount": 25, "category": "Canteen", "dateTime": "2024-10-11 12:00:00", "fromAccount": "SBI", "id": 5, "title": "Samosa Chai", "type": "Expense"}, {"amount": 1100, "category": "Papa", "dateTime": "2024-10-11 12:12:00", "toAccount": "SBI", "id": 15, "title": "Monthly allowance", "type": "Income"}, {"amount": 200, "category": "Transfer", "dateTime": "2024-10-11 12:00:00", "fromAccount": "SBI", "toAccount" : "Cash", "id": 35, "title": "Balancing", "type": "Transfer"}]
  const dateSegregatedTransactions: { [key: string]: Transaction[] } = {};

  for (let i = 0; i < transactions.length; i++) {
    let date = transactions[i].dateTime.split(" ")[0];
    if (date in dateSegregatedTransactions) {
      dateSegregatedTransactions[date].push(transactions[i]);
    }
    else {
      dateSegregatedTransactions[date] = [transactions[i]];
    }
  }

  // for (let key in dateSegregatedTransactions) {
  //   console.log(key); // just for loging
  //   dateSegregatedTransactions[key].map((item: Transaction) => { console.log(item.id) });
  // }
  // const getdate = async () => {
  // const expenseResult = await db.getAllAsync<{expense:number}>("SELECT IFNULL(SUM(amount), 0) as expense FROM Transactions WHERE type='Expense'");
  // const incomeResult = await db.getAllAsync<{income:number}>("SELECT IFNULL(SUM(amount), 0) as income FROM Transactions WHERE type='Income'");
  // const transactions = await db.getAllAsync("SELECT t.id, t.title, t.type, t.dateTime, t.amount, a.name as fromAccount, c.name as category FROM transactions t JOIN accounts a ON t.fromAccountId = a.id OR t.toAccountId = a.id JOIN categories c ON t.categoryId = c.id WHERE t.type = 'Expense'");

  // setExpense(expenseResult[0].expense);
  // setIncome(incomeResult[0].income);
  // console.log(expenseResult, incomeResult);
  // console.log(transactions);
  // }
  // useEffect(()=>{
  //   db.withTransactionAsync(async () => {
  //     await getdate();
  //   })
  // }, [db]);

  return (
    <ScrollView className='bg-[#fffde8]' showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <ExpenseSubHeader income={income} expense={expense} />
        <View style={{ width: '100%', height: 1, opacity: 0.5, backgroundColor: '#004c3f', marginTop: 12, marginBottom: 15 }} />
        {
          Object.keys(dateSegregatedTransactions).map((date, i) => {
            return (
              
              <View key={i} id='dayTransactions' className='flex self-center w-11/12 mb-7'>
                <Text className='font-bold mb-1 color-[#004c3f] tracking-wide'>{getDayDate(date)}</Text>
                <ThickLineFull />
                {
                  dateSegregatedTransactions[date].map((transaction, i, arr) => (<Transaction key={transaction.id} transaction={transaction} index={i} size={arr.length}/>))
                }
              </View>
            )
          })
        }
        <Text>Personal Expenses would be shown here. </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffde8',
  },

  subHeaderBalance: {

  },

});
