import React, { useState } from "react";
import { Center, FormControl, FormLabel, Switch } from "@chakra-ui/react";
import EyeTrackingFeed from "./EyeTrackingFeed";

function EyeTracking() {
  const [enabled, setEnabled] = useState(false);

  const handleChange = () => {
    setEnabled(!enabled);
    if (enabled) {
    }
  };

  return (
    <div>
      <Center>
        <FormControl mt="5" display="flex" alignItems="center">
          <FormLabel htmlFor="eye-tracking" mb="0">
            Eye Tracking
          </FormLabel>
          <Switch
            isChecked={enabled}
            onChange={handleChange}
            id="eye-tracking"
          />
        </FormControl>
      </Center>
      {enabled && <EyeTrackingFeed />}
    </div>
  );
}

export default EyeTracking;
