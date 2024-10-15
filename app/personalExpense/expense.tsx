import { StyleSheet, View, SafeAreaView, Text, ScrollView } from 'react-native';
import ExpenseSubHeader from '@/components/headers/ExpenseSubHeader';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import Transaction from '@/components/TransactionPage/Transaction';
import ThickLineFull from '@/components/ThickLineFull';
import { getDayDate } from '@/utils';

export default function Expense() {
  const db = useSQLiteContext();
  const date = new Date();
  const [month, setMonth] = useState(date.getMonth()+1);
  const [year, setYear] = useState(date.getFullYear());
  const [income, setIncome] = useState(500.36);
  const [expense, setExpense] = useState(1200);
  const [transactions, setTransaction] = useState<Transaction[]>([])

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
  const changeMonth = (change: number) => {
    if (month == 12 && change == 1) {
      setMonth(1);
      setYear(currYear => currYear + 1);
    } 
    else if(month == 1 && change == -1){
      setMonth(12)
      setYear(currYear => currYear - 1);
    }
    else{
      setMonth(currMon => currMon + change)
    }
  }
  
  const getMonthTransactions = async () => {
    // const expenseResult = await db.getAllAsync<{expense:number}>("SELECT IFNULL(SUM(amount), 0) as expense FROM Transactions t WHERE type='Expense' AND strftime('%m', t.dateTime)=? AND strftime('%Y', t.dateTime)=?", 
    // [month.toString(),year.toString()]);
    
    // const incomeResult = await db.getAllAsync<{income:number}>("SELECT IFNULL(SUM(amount), 0) as income FROM Transactions t WHERE type='Income' AND strftime('%m', t.dateTime)=? AND strftime('%Y', t.dateTime)=?",
    //   [month.toString(),year.toString()]);
    
    const transactions = await db.getAllAsync<Transaction>("SELECT t.id, t.title, t.type, t.dateTime, t.amount, CASE WHEN t.toAccountId IS NULL THEN a.name ELSE NULL END as fromAccount, CASE WHEN t.fromAccountId IS NULL THEN a.name ELSE NULL END as toAccount, c.name as category FROM transactions t JOIN accounts a ON t.fromAccountId = a.id OR t.toAccountId = a.id JOIN categories c ON t.categoryId = c.id WHERE t.type != 'Transfer' AND strftime('%m', t.dateTime)=? AND strftime('%Y', t.dateTime)=? UNION SELECT t.id, t.title, t.type, t.dateTime, t.amount, a_from.name AS fromAccount, a_to.name AS toAccount, c.name AS category FROM transactions t JOIN accounts a_from ON t.fromAccountId = a_from.id JOIN accounts a_to ON t.toAccountId = a_to.id JOIN categories c ON t.categoryId = c.id WHERE t.type = 'Transfer' AND strftime('%m', t.dateTime)=? AND strftime('%Y', t.dateTime)=? ORDER BY t.dateTime DESC", 
    [month.toString(),year.toString(),month.toString(),year.toString()]);

    setTransaction(transactions);

    // setExpense(expenseResult[0].expense);
    // setIncome(incomeResult[0].income);
    // console.log(expenseResult, incomeResult);
    console.log(transactions);
  }
  const insertTransactions = async () => {
    await db.runAsync("INSERT INTO transactions (id, title, type, dateTime, categoryId, fromAccountId, toAccountId, amount) VALUES (NULL, 'Ticket price balancing', 'Transfer', '2024-10-15 14:45:24.000000', 0, 1, 2, 300), (NULL, 'Aloo Paratha', 'Expense', '2024-11-15 14:45:24.000000', 4, 1, NULL, 30), (NULL, 'Monthly Rent', 'Income', '2024-09-15 14:45:24.000000', 3, NULL, 2, 3000), (NULL, 'Aloo Paratha', 'Expense', '2024-11-15 14:45:24.000000', 4, 1, NULL, 30), (NULL, 'Monthly Allowance', 'Income', '2024-09-15 10:45:24.000000', 2, NULL, 1, 1100)");
    // await insertTransactions();
  }
  useEffect(() => {
    db.withTransactionAsync(async () => {
      await getMonthTransactions();
    })
  }, [db, month, year]);

  return (
    <>
      <ExpenseSubHeader income={income} expense={expense} month={month} year={year} changeMonth={changeMonth}/>
      <ScrollView className='bg-[#fffde8] pt-5' showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {
            Object.keys(dateSegregatedTransactions).length === 0 ? (
              <View className='flex items-center self-center mb-7'>
                <Text className='font-bold mb-1 color-[#004c3f] tracking-wide'>No transactions available</Text>
                <Text className='color-[#004c3f]'>Tap the + icon to add</Text>
              </View>
            ) : (
              Object.keys(dateSegregatedTransactions).map((date, i) => (
                <View key={i} id='dayTransactions' className='flex self-center w-11/12 mb-7'>
                  <Text className='font-bold mb-1 color-[#004c3f] tracking-wide'>{getDayDate(date)}</Text>
                  <ThickLineFull />
                  {
                    dateSegregatedTransactions[date].map((transaction, i, arr) => (
                      <Transaction key={transaction.id} transaction={transaction} index={i} size={arr.length} />
                    ))
                  }
                </View>
              ))
            )
          }
        </View>
      </ScrollView>
    </>
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
