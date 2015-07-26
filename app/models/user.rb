class User < ActiveRecord::Base
  has_many :blabs
  validates :uid, presence: true
end
