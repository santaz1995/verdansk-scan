import { Card, Metric, Text, Title, BarList, Flex, Grid, AreaChart } from '@tremor/react';

interface Stat {
    id: number;
    userId: string;
    userName: string;
    normalMessageCount: number;
    questionMessageCount: number;
}

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

export default async function Stats() {
    const result = await (await fetch('https://verdansk-telegram-scan-api.vercel.app/stat')).json() as Stat[];
    return (
        <main>
            <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
                {result.map((item) => (
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
                            <Text>Message type</Text>
                            <Text className="text-right">Count</Text>
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
            {/*<Card className="mt-8">*/}
            {/*    <Title>Scan the chat for Leo`s questions and bullying</Title>*/}
            {/*    <Text>Leo`s questions and bullying</Text>*/}
            {/*    <AreaChart*/}
            {/*        className="mt-4 h-80"*/}
            {/*        data={data}*/}
            {/*        categories={['Sales', 'Profit']}*/}
            {/*        index="Month"*/}
            {/*        colors={['indigo', 'fuchsia']}*/}
            {/*        valueFormatter={(number: number) =>*/}
            {/*      `$ ${Intl.NumberFormat('us').format(number).toString()}`*/}
            {/*    }*/}
            {/*        yAxisWidth={60}*/}
            {/*    />*/}
            {/*</Card>*/}
        </main>
        );
}
