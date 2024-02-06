import { Image, Text, View } from 'react-native'
import { Link, useLocalSearchParams } from 'expo-router'
import { PRODUCTS } from '@/src/utils/data/products'
import Button from '@/src/components/Button'

export default function Product() {
  const { id } = useLocalSearchParams()

  const product = PRODUCTS.filter((item) => item.id === id)
  console.log(product)
  return (
    <View>
      <Image source={product[0].cover} className="w-full h-48" />
      <View className="h-full px-5 py-8 bg-slate-900">
        <Text className="text-white text-xl">{product[0].title}</Text>
        <Text className="text-lime-400 text-2xl font-bold">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(product[0].price)}
        </Text>
        <Text className="w-80 text-slate-400 text-sm mb-5">
          {product[0].description}
        </Text>
        {product[0].ingredients.map((ingredient) => (
          <View className="flex-row items-center p-1">
            <View className="w-1 h-1 bg-slate-400 rounded-full" />
            <Text key={ingredient} className="text-slate-400 ml-2">
              {ingredient}
            </Text>
          </View>
        ))}
        <View className="py-28">
          <Button title="Adicionar ao pedido" primary icon={'pluscircleo'} />
          <Link href={'/'} asChild>
            <Button title="Voltar ao cardápio" secondary />
          </Link>
        </View>
      </View>
    </View>
  )
}
