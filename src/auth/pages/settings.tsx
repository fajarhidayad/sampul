import { FC } from 'hono/jsx';
import ProfileForm from '../components/profile-form';

interface SettingsProps {
  email: string;
  firstName: string;
  lastName: string;
}

const SettingsPage: FC<SettingsProps> = (props) => {
  return (
    <div class={'w-full'}>
      <h1 class={'text-2xl font-semibold text-slate-800 mb-5'}>Settings</h1>
      <section
        class={'bg-white rounded-xl shadow px-5 py-7 w-full grid grid-cols-2'}
      >
        <ProfileForm form={props} />

        <div>
          <button class={'btn btn-outline'} onclick="passwordModal.showModal()">
            Update Password
          </button>
          <dialog id="passwordModal" class="modal">
            <div class="modal-box">
              <form method="dialog">
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 class="text-lg font-bold">Ganti Password</h3>
              <form action="" class={'space-y-3'} method="post">
                <label class="form-control w-full max-w-xs">
                  <div class="label">
                    <span class="label-text">Password lama</span>
                  </div>
                  <input
                    type="password"
                    placeholder="Masukkan password lama"
                    name="oldPassword"
                    id="oldPassword"
                    class="input input-bordered w-full max-w-xs"
                  />
                  <div class="label hidden">
                    <span class="label-text-alt">Bottom Left label</span>
                  </div>
                </label>
                <label class="form-control w-full max-w-xs">
                  <div class="label">
                    <span class="label-text">Password baru</span>
                  </div>
                  <input
                    type="password"
                    placeholder="Masukkan password baru"
                    name="newPassword"
                    id="newPassword"
                    class="input input-bordered w-full max-w-xs"
                  />
                  <div class="label hidden">
                    <span class="label-text-alt">Bottom Left label</span>
                  </div>
                </label>
                <label class="form-control w-full max-w-xs">
                  <div class="label">
                    <span class="label-text">Konfirmasi password baru</span>
                  </div>
                  <input
                    type="password"
                    placeholder="Konfirmasi password baru"
                    name="confirmationPassword"
                    id="confirmationPassword"
                    class="input input-bordered w-full max-w-xs"
                  />
                  <div class="label hidden">
                    <span class="label-text-alt">Bottom Left label</span>
                  </div>
                </label>
                <button class={'btn btn-primary'} type="submit">
                  Simpan
                </button>
              </form>
            </div>
          </dialog>
        </div>
      </section>
    </div>
  );
};

export default SettingsPage;
