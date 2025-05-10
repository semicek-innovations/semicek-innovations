// 'use client'

// import { useState } from 'react'

// import { Can, CanProps } from '@/auth/client'
// import { useUser } from '@/providers/user-provider'
// import { tv, Avatar, Button, Popover, PopoverContent, PopoverTrigger, ScrollShadow } from '@heroui/react'
// import Link from 'next/link'

// const link = tv({
//   base: 'block w-full rounded-small px-2 py-1.5 capitalize hover:bg-default/40'
// })

// type RouteProps = CanProps & {
//   label: string
//   path: string
// }

// export function ProfilePopover() {
//   const [isOpen, setIsOpen] = useState(false)
//   const { user, firebase, signOut, isSigningOut } = useUser()
//   const signedAs = user?.username || user?.name || user?.email || firebase.user?.email

//   const routes = [
//     { label: 'Admin', path: '/admin/users', I: 'manage', a: 'all' },
//     { label: 'Profile', path: '/members/profile', I: 'get', a: 'User' },
//     // { label: 'Chat', path: '/members/chat', I: 'sendMessage', a: 'Chat' },
//     { label: 'Products', path: '/members/products', I: 'create', a: 'Product' },
//     { label: 'My Sales', path: '/members/my-sales', I: 'create', a: 'Product' },
//     { label: 'My Purchases', path: '/members/my-purchases', I: 'get', a: 'User' },
//     { label: 'Submissions', path: '/members/submissions', I: 'get', a: 'Event' }
//   ] as RouteProps[]

//   return (
//     <Popover placement="bottom-end" isOpen={isOpen} onOpenChange={setIsOpen}>
//       <PopoverTrigger className="ml-1">
//         <Avatar as="button" src={user?.profile_image ?? undefined} color="secondary" size="sm" isBordered />
//       </PopoverTrigger>
//       <PopoverContent className="space-y-2 p-2">
//         <p className="px-2 font-semibold">{`Signed in as ${signedAs}`}</p>
//         <ScrollShadow className="max-h-48 w-full" hideScrollBar>
//           {routes.map(({ label, path, ...canProps }) => (
//             <Can key={path} {...canProps}>
//               <Link href={path} className={link()} onClick={() => setIsOpen(false)}>
//                 {label}
//               </Link>
//             </Can>
//           ))}
//         </ScrollShadow>
//         <Button
//           color="danger"
//           variant="light"
//           radius="sm"
//           spinnerPlacement="end"
//           className="h-auto w-full justify-start px-2 py-1.5"
//           onPress={signOut}
//           isLoading={isSigningOut}
//         >
//           <p className="w-full text-start">Log Out</p>
//         </Button>
//       </PopoverContent>
//     </Popover>
//   )
// }
