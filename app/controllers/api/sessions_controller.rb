class Api::SessionsController < ApplicationController
    def create
        @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
        if @user
            login!(@user)
            render 'api/users/show'
        else
            render json: ['Invalid username or password'], status: 403
        end
    end

    def destroy
        if current_user
            logout!
            render json: {}
        else
            render json: ['uh oh'], status: 404
        end
    end
end