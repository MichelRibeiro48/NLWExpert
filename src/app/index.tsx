import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  SectionList,
} from 'react-native'
import FeatherIcon from '@expo/vector-icons/Feather'
import { useRef, useState } from 'react'
import Button from '../components/Button'
import { CATEGORIES, MENU, PRODUCTS } from '../utils/data/products'
import { Card } from '../components/Card'
import { Link } from 'expo-router'
import { useCartStore } from '../stores/cart-store'

export default function Home() {
  const cartStore = useCartStore()
  const [products, setProducts] = useState(0)
  const [selected, setSelected] = useState(0)
  const [category, setCategory] = useState(CATEGORIES[0])

  const sectionListRef = useRef<SectionList>(null)

  const cartQuantityItems = cartStore.products.reduce(
    (total, product) => total + product.quantity,
    0
  )

  const onHandleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory)

    const sectionIndex = CATEGORIES.findIndex(
      (category) => category === selectedCategory
    )

    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex,
        itemIndex: 0,
      })
    }
  }

  return (
    <View className="flex-1 bg-slate-900 px-5 py-6">
      <View className="items-center flex-row justify-between">
        <View>
          <Image source={require('../assets/logo.png')} className="w-32 h-6" />
          <Text className="text-white text-xl">Faça seu pedido</Text>
        </View>
        {cartQuantityItems > 0 && (
          <>
            <FeatherIcon name="shopping-bag" size={24} color={'white'} />
            <View className="absolute self-end right-0 top-2 bg-lime-300 w-[14px] h-[14px] items-center justify-center rounded-full">
              <Text className="text-[11px]">{cartQuantityItems}</Text>
            </View>
          </>
        )}
      </View>
      <View className="w-full bg-slate-700 h-[1px] my-5" />
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Button
            title={item}
            isSelected={item === category}
            onPress={() => onHandleCategorySelect(item)}
          />
        )}
        horizontal
        className="max-h-11 mt-5"
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}
      />
      <SectionList
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Card
              image={item.thumbnail}
              productName={item.title}
              productDescription={item.description}
            />
          </Link>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-xl text-white mt-8 mb-3">{title}</Text>
        )}
        className="flex-1 p-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  )
}
