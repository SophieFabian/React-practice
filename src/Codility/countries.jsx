import React, {
  useEffect,
  useState,
  IntersectionObserver,
  useRef,
  useMemo,
} from "react";
import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";

export default function App() {
  const URL = "https://example.com/countries";
  const [countries, setCountries] = useState([]);
  const [offset, setOffset] = useState(0);
  const endRef = useRef();

  useEffect(() => {
    const queryParams = `?offset=${offset}&limit=20`;
    fetch(`${URL}${queryParams}`)
      .then((resp) => resp.json())
      .then((json) => {
        const newCountries = json.results.map((country, index) => {
          console.log("OFFSET", offset, "index", index);
          return {
            title: country.name,
            id: offset * 100 + index,
          };
        });
        console.log("NEW COUNTRIES", newCountries);

        setCountries([...countries, ...newCountries]);
      });
  }, [offset]);

  useEffect(() => {
    console.log("DOCUMENT", document);
    if (document.getElementById("root")) {
      console.log("ROOT", document.getElementById("root"));
      document.getElementById("root").addEventListener("scroll", handleScroll);
    }
  }, []);

  const handleScroll = () => {};

  // const useOnScreen = (ref) => {
  //   const [isIntersecting, setIntersecting] = useState(false);
  //   const observer = useMemo(
  //     () =>
  //       new IntersectionObserver(([entry]) =>
  //         setIntersecting(entry.isIntersecting)
  //       ),
  //     [ref]
  //   );

  //   useEffect(() => {
  //     observer.observe(ref.current);
  //     return () => observer.disconnect();
  //   }, []);

  //   return isIntersecting;
  // };

  // const isVisible = useOnScreen(endRef);

  console.log("COUNTRIES", countries);
  return (
    <div id="root">
      {countries && countries.length > 0 ? (
        <>
          <View style={styles.container}>
            <FlatList
              style={styles.list}
              data={countries}
              renderItem={(item) => (
                <View style={styles.listItem}>
                  <div>{item.item.title}</div>
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
          <div ref={endRef}></div>
        </>
      ) : (
        <ActivityIndicator />
      )}
    </div>
  );
}

// <FlatList
//     data={DATA}
//     renderItem={({item}) => <Item title={item.title} />}
//     keyExtractor={item => item.id}
//   />

// You can also use class components if you like.
// Just remove above functional component and uncomment below class component:
// export default class App extends React.Component {
//   // Write your logic here ...
//
//   render() {
//     return (
//       <View style={styles.container}>
//          <FlatList
//            style={styles.list}
//            data={[]}
//            renderItem={() => <View style={styles.listItem}></View>}
//          />
//       </View>
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    width: "100%",
    height: "100%",
  },
  listItem: {
    width: "100%",
    height: "40px",
    padding: "8px",
    alignItems: "flexStart",
  },
});
