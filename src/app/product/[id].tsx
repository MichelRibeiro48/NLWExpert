import { Image, Text, View } from 'react-native'
import { Link, useLocalSearchParams } from 'expo-router'
import { PRODUCTS } from '@/src/utils/data/products'
import Button from '@/src/components/Button'
import { useCartStore } from '@/src/stores/cart-store'
import ButtonLink from '@/src/components/ButtonLink'

export default function Product() {
  const cartStore = useCartStore()
  const { id } = useLocalSearchParams()

  const product = PRODUCTS.filter((item) => item.id === id)[0]
  console.log(cartStore.products)

  const handleAddToCart = () => {
    cartStore.add(product)
  }
  return (
    <View>
      <Image source={product.cover} className="w-full h-48" />
      <View className="h-full px-5 py-8 bg-slate-900">
        <Text className="text-white text-xl">{product.title}</Text>
        <Text className="text-lime-400 text-2xl font-bold">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(product.price)}
        </Text>
        <Text className="w-80 text-slate-400 text-sm mb-5">
          {product.description}
        </Text>
        {product.ingredients.map((ingredient) => (
          <Text
            key={ingredient}
            className="text-slate-400 font-medium leading-6"
          >
            {'\u2022'} {ingredient}
          </Text>
        ))}
        <View className="py-28">
          <Button
            title="Adicionar ao pedido"
            primary
            icon={'pluscircleo'}
            onPress={handleAddToCart}
          />
          <ButtonLink title="Voltar ao cardápio" secondary />
        </View>
      </View>
    </View>
  )
}
