Rails.application.routes.draw do
  resources :tokens, only: [:create]

  root to: 'chats#show'
end
