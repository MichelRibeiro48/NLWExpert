import { Image, Text, TouchableOpacity, View } from 'react-native'
import { CardT } from './cardT'
import { forwardRef } from 'react'

export const Card = forwardRef<TouchableOpacity, CardT>(
  ({ image, productName, productDescription, ...rest }, ref) => {
    return (
      <TouchableOpacity ref={ref} className="w-20 h-20 flex-row mb-8" {...rest}>
        <Image source={image} className="rounded-md" />
        <View className="w-60 ml-3">
          <Text className="text-white text-lg">{productName}</Text>
          <Text className="text-xs text-slate-400 ">{productDescription}</Text>
        </View>
      </TouchableOpacity>
    )
  }
)
