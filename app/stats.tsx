import { Card, Metric, Text, Title, BarList, Flex, Grid } from '@tremor/react';
import { useEffect, useState } from 'react';

interface Stat {
    id: number;
    userId: string;
    userName: string;
    normalMessageCount: number;
    questionMessageCount: number;
}

export default async function Stats() {
    const [postsData, setPostsData] = useState([]);

    function fetchData() {
        fetch('http://localhost:3005/stat')
          .then(response => {
              response.json().then((data) => {
                setPostsData(data);
              })
          })
          .catch(error => console.log(error));
    }
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <main>
            <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
                {postsData.map((item: Stat) => (
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
