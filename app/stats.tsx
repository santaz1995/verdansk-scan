import { sql } from '@vercel/postgres';
import { Card, Metric, Text, Title, BarList, Flex, Grid, AreaChart } from '@tremor/react';

const data = [
    {
        Month: 'Jan 21',
        Sales: 2890,
        Profit: 2400
    },
    {
        Month: 'Feb 21',
        Sales: 1890,
        Profit: 1398
    },
    {
        Month: 'Jan 22',
        Sales: 3890,
        Profit: 2980
    }
];

export default async  function Stats() {
    const result = await sql`SELECT * FROM app`;
    console.log(result.rows);
    return (
        <main>
            <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
                {result.rows.map((item) => (
                    <Card key={item.userId}>
                        <Title>{item.userName}</Title>
                        <Flex
                            justifyContent="start"
                            alignItems="baseline"
                            className="space-x-2"
                            >
                            <Metric>{item.normalMessageCount + item.questionMessageCount}</Metric>
                            <Text>Message</Text>
                        </Flex>
                        <Flex className="mt-6">
                            <Text>Pages</Text>
                            <Text className="text-right">Views</Text>
                        </Flex>
                        <BarList
                            data={[
                                { name: 'Question', value: item.questionMessageCount },
                                { name: 'Normal', value: item.normalMessageCount },
                            ]}
                            valueFormatter={(number: number) => Intl.NumberFormat('us').format(number).toString() }
                            className="mt-2"
                        />
                    </Card>
                    ))}
            </Grid>
            <Card className="mt-8">
                <Title>Scan the chat for Leo`s questions and bullying</Title>
                <Text>Leo`s questions and bullying</Text>
                <AreaChart
                    className="mt-4 h-80"
                    data={data}
                    categories={['Sales', 'Profit']}
                    index="Month"
                    colors={['indigo', 'fuchsia']}
                    valueFormatter={(number: number) =>
                  `$ ${Intl.NumberFormat('us').format(number).toString()}`
                }
                    yAxisWidth={60}
                />
            </Card>
        </main>
        );
}
