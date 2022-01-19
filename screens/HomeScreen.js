import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

const data = [
  {
    id: 3470,
    business_name: 'Mueller-Stracke',
    catch_phrase: 'Advanced analyzing frame',
    logo: 'https://pigment.github.io/fake-logos/logos/medium/color/6.png',
    full_address: 'Apt. 989 87742 Bernhard Divide, Lake Kandybury, ID 39637',
  },
  {
    id: 4174,
    business_name: 'Bednar-Klein',
    catch_phrase: 'Multi-lateral stable local area network',
    logo: 'https://pigment.github.io/fake-logos/logos/medium/color/8.png',
    full_address: 'Suite 228 8265 Lucien Lights, North Nickolas, NM 95307-5331',
  },
  {
    id: 8699,
    business_name: 'Ullrich, Stokes and Purdy',
    suffix: 'and Sons',
    industry: 'Retail',
    catch_phrase: 'Triple-buffered 3rd generation knowledge user',
    logo: 'https://pigment.github.io/fake-logos/logos/medium/color/3.png',
    full_address: '48654 Chris Motorway, Port Shanell, WA 40323-1589',
  },
  {
    id: 9652,
    business_name: 'Osinski-Klocko',
    catch_phrase: 'Exclusive exuding collaboration',
    logo: 'https://pigment.github.io/fake-logos/logos/medium/color/6.png',
    full_address: 'Suite 627 85038 Andrew Islands, Bennettton, TN 90297-0359',
  },
  {
    id: 4450,
    business_name: 'Bechtelar-Gutkowski',
    catch_phrase: 'Re-contextualized intermediate functionalities',
    logo: 'https://pigment.github.io/fake-logos/logos/medium/color/6.png',
    full_address: '21874 Stoltenberg Village, Lake Sammy, CA 38715',
  },
  {
    id: 5967,
    business_name: 'Jones, Hoppe and Macejkovic',
    suffix: 'Group',
    industry: 'Alternative Dispute Resolution',
    catch_phrase: 'User-centric tertiary Graphic Interface',
    logo: 'https://pigment.github.io/fake-logos/logos/medium/color/11.png',
    full_address: '560 Jin Neck, Lake Collene, WA 84459',
  },
  {
    id: 3449,
    business_name: 'Kessler LLC',
    catch_phrase: 'Self-enabling grid-enabled protocol',
    logo: 'https://pigment.github.io/fake-logos/logos/medium/color/8.png',
    full_address: '917 Gussie Knoll, North Debibury, IA 78879',
  },
  {
    id: 1321,
    business_name: 'Champlin, Schimmel and Brekke',
    catch_phrase: 'Innovative web-enabled algorithm',
    logo: 'https://pigment.github.io/fake-logos/logos/medium/color/2.png',
    full_address: '3611 Yvonne Ranch, East Michelle, ID 60676-6834',
  },
  {
    id: 4094,
    business_name: 'Kessler-Upton',
    catch_phrase: 'Sharable upward-trending leverage',
    logo: 'https://pigment.github.io/fake-logos/logos/medium/color/9.png',
    full_address: '136 Aimee Inlet, New Marnistad, OK 15798-0480',
  },
  {
    id: 1500,
    business_name: 'Lebsack LLC',
    catch_phrase: 'Innovative radical budgetary management',
    logo: 'https://pigment.github.io/fake-logos/logos/medium/color/8.png',
    full_address: '40224 Leigh Mall, Lake Rueben, OR 20401',
  },
];

const HomeScreen = props => {
  const onPressHandler = idx => {
    props.navigation.navigate('FormScreen', {name: data[idx].business_name});
  };

  const renderItemHandler = (item, idx) => (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onPressHandler(idx)}>
      <View style={styles.dataContainer}>
        <Image style={styles.img} source={{uri: item.logo}} />
        <View style={styles.content}>
          <Text style={styles.companyTitle}>{item.business_name}</Text>
          <Text style={styles.tagLine}>{item.catch_phrase}</Text>
          <Text style={styles.address}>Address: {item.full_address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Businesses</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        data={data}
        renderItem={({item, index}) => renderItemHandler(item, index)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 27,
    textAlign: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  dataContainer: {
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
  },
  img: {
    width: '100%',
    height: 300,
  },
  content: {
    marginTop: 10,
    backgroundColor: '#f1f1f1',
  },
  companyTitle: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
