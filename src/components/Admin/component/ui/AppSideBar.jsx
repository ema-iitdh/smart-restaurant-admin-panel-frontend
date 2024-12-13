import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import { LayoutDashboard, Salad, ShieldCheck, Store } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

export default function AppSideBar() {
  // const [showAlert, setShowAlert] = useState(false);
  // const [restaurantName, setRestaurantName] = useState('');

  // const location = useLocation();
  // const navigate = useNavigate();

  // const handleAddFoodClick = () => {
  //   setShowAlert(true);
  // };

  // const handleConfirmAddFood = () => {
  //   if (!restaurantName.trim()) {
  //     alert('Please enter a valid restaurant name.');
  //     return;
  //   }

  //   const originalRestaurantName = restaurantName.trim();
  //   const formatRestaurantName = originalRestaurantName
  //     .toLowerCase()
  //     .replace(/\s+/g, '-');

  //   setShowAlert(false);
  //   navigate(
  //     `/super-admin-dashboard/${encodeURIComponent(
  //       formatRestaurantName
  //     )}/add-food`,
  //     {
  //       state: { originalRestaurantName },
  //     }
  //   );
  // };
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarContent className=' pt-3 bg-gray-800 text-customWhite'>
        <SidebarGroup>
          <SidebarGroupLabel className='flex gap-3 items-center text-lg text-customWhite font-semibold mb-4'>
            <ShieldCheck size='40' />
            Super Admin
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {[
                {
                  title: 'Dashboard',
                  url: '/super-admin/dashboard',
                  icon: LayoutDashboard,
                },
                {
                  title: 'Manage Restaurant',
                  url: '/super-admin/manage-restaurant',
                  icon: Store,
                },
                {
                  title: 'Manage Food',
                  url: '/super-admin/manage-food',
                  icon: Salad,
                },
              ].map((item) => {
                const isActive = location.pathname.includes(item.url);

                return (
                  <SidebarMenuItem
                    key={item.title}
                    className={`mb-2 rounded-md transition-colors duration-200 ${
                      isActive ? 'bg-gray-200 text-gray-800' : 'text-gray-300'
                    } `}
                  >
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        // end
                        // className='flex items-center gap-3 p-2 font-medium'
                      >
                        <item.icon className='' />
                        <span className='text-md'>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
