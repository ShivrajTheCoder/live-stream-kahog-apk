import React, { useRef } from "react";
import { View, Button, Text, TouchableOpacity } from "react-native";
import RBSheet from "@nonam4/react-native-bottom-sheet"; // Assuming RBSheet is correctly imported

export default function BottomSheet() {
  const refRBSheet = useRef(null); // Create a ref using useRef hook

  const openBottomSheet = () => {
    if (refRBSheet.current) {
      refRBSheet.current.open(); // Open the bottom sheet if the ref is set
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" }}>
      {/* <Button title="OPEN BOTTOM SHEET" onPress={openBottomSheet} />
       */}
       <TouchableOpacity onPress={openBottomSheet}>
        <Text>Hi</Text>
       </TouchableOpacity>
      <RBSheet
        ref={refRBSheet} // Assign the ref to the RBSheet component
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
        <View>
          <Text>Hello</Text>
        </View>
      </RBSheet>
    </View>
  );
}
